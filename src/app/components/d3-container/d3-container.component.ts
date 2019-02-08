import { SidebarContentService } from '../../services/sidebar-content.service';
import { GitApiService } from '../../services/git-api.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-d3-container',
  templateUrl: './d3-container.component.html',
  styleUrls: ['./d3-container.component.css']
})
export class D3ContainerComponent implements OnInit {
  private graph
  private link
  private node
  private text
  private width
  private height
  private simulation
  private highlightedId = "";
  private hoveredId = "";
  private clickedId = "";
  private searchedId = "";
  private paused = false;
  private linkedById = {}

  constructor(
    private gitApiService: GitApiService,
    private sidebarContentService: SidebarContentService
  ) {
    this.gitApiService.getGraphChange().subscribe(graph => {
      this.drawGraph(graph)
    })
  }

  ngOnInit() {
  }
  
  // D3 LIVES HERE =======================================
  
  private drawGraph(graph): void {
    this.graph = graph
    const svg = d3.select('.svg-main');
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    this.width = Number(svg.attr("width"));
    this.height = Number(svg.attr("height"));

    svg.on("click", this.unhighlightNode.bind(this));

    this.simulation = d3.forceSimulation()
      .force(
        "link", d3.forceLink()
          .distance(d => this.distance(d))
          .strength(1)
          .id((d) => d.id)
      )
      .force("charge", d3.forceManyBody(0))
      .force("collision", d3.forceCollide(10));

    // LINKS, NODES, AND TEXT =============================

    this.link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("marker-end", (d) => `url(#marker_${d.id})`)
      .attr("opacity", ".4");

    svg.append("svg:defs").selectAll("marker")
      .data(graph.links)
      .enter().append("svg:marker")
      .attr("id", (d) => `marker_${d.id}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .attr("fill", "#ccc")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

    // Pre-compute radius to save processing time
    const graphNodes = [];
    for (let i = 0; i < graph.nodes.length; i++) {
      graphNodes.push(Object.assign(
        {},
        graph.nodes[i],
        { r: Math.sqrt(graph.nodes[i].loc * 2 + 25) }
      ));
    }

    this.node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graphNodes)
      .enter()
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => this.color(d))
      .call(d3.drag()
        .on("start", this.dragstarted.bind(this))
        .on("drag", this.dragged.bind(this))
        .on("end", this.dragended.bind(this))
      )
      .on("click", this.highlightNode.bind(this))
      .on("mouseover", this.hoverNode.bind(this))
      .on("mouseout", this.hoverNode.bind(this));

    this.text = svg.selectAll("text").filter(".label")
      .data(graphNodes)
      .enter()
      .append("text")
      .classed("label", true)
      .text((d) => this.abbreviate(d.name));

    this.simulation.nodes(graphNodes)
      .on("tick", this.ticked.bind(this));

    this.simulation.force("link")
      .links(graph.links);
      
    // NEIGHBOR HELPER METHODS ===========================

    this.linkedById = {};
    for (let i = 0; i < graphNodes.length; i++) {
      this.linkedById[`${i},${i}`] = 1;
    }
    graph.links.forEach(d => {
      this.linkedById[`${d.source.id},${d.target.id}`] = 1;
    });
  }
  
  // TICK FUNCTION ========================================
  
  _boundedX(d) {
    return Math.max(d.r, Math.min(this.width - d.r - 2, d.x));
  };
  _boundedY(d) {
    return Math.max(d.r, Math.min(this.height - d.r - 2, d.y));
  };
  
  ticked() {
    const circumferenceHash = {};
    this.link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => {
        circumferenceHash[d.source.id + d.target.id] = this.getCircumferencePoint(d);
        return circumferenceHash[d.source.id + d.target.id][0];
      })
      .attr("y2", (d) => circumferenceHash[d.source.id + d.target.id][1]);

    this.node
      .attr("cx", (d) => {
        d.x = this._boundedX(d);
        return d.x;
      })
      .attr("cy", (d) => {
        d.y = this._boundedY(d);
        return d.y;
      });

    this.text
      .attr("x", (d) => d.x + 1 + d.r)
      .attr("y", (d) => d.y + 3);
  }
  
  getCircumferencePoint(d) {
    const tRadius = d.target.r;
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const gamma = Math.atan2(dy, dx);
    const tx = d.target.x - (Math.cos(gamma) * tRadius);
    const ty = d.target.y - (Math.sin(gamma) * tRadius);
    return [tx, ty];
  }
  
  linkedIds(a, b) {
    return this.linkedById[`${a},${b}`];
  }
  
  adjacent(o, d) {
    const oId = o.id ? o.id : o;
    const dId = d.id ? d.id : d;
    return this.linkedIds(oId, dId) || this.linkedIds(dId, oId) || oId === dId;
  }
  
  // HOVER / HIGHLIGHT / CLICK EFFECTS ===================
  
  highlightNode(d) {
    d3.event.stopPropagation();
    if (!this.highlightedId || this.highlightedId !== d.id) {
      this.highlightedId = d.id;
      this.sidebarContentService.setContent(d.content)
      this.sidebarContentService.setData({
        currentFile: d.id,
        currentLoc: d.loc,
      })
    } else {
      this.sidebarContentService.setHelpMessage()
      this.sidebarContentService.setData({
        currentFile: "",
        currentLoc: "",
      })
      this.highlightedId = "";
    }
    this.generateOpacity();
    this.generateText();
  }
  
  unhighlightNode(d) {
    this.sidebarContentService.setHelpMessage()
    this.sidebarContentService.setData({
      currentFile: "",
      currentLoc: "",
    })
    this.highlightedId = "";
    this.generateOpacity();
    this.generateText();
  }
  
  hoverNode(d) {
    if (this.hoveredId !== d.id) {
      this.hoveredId = d.id;
    } else {
      this.hoveredId = "";
    }
    this.generateOpacity();
    this.generateText();
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    this.clickedId = d.id;
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    this.clickedId = "";
    this.generateOpacity();
    this.generateText();
    if (!this.paused) {
      d.fx = null;
      d.fy = null;
    }
  }
  
  // GENERATE TEXT / OPACITY ===========================
  
  generateText() {
    const mousedId = this.clickedId || this.hoveredId;
    this.text.text((o) => {
      if (this.highlightedId && this.adjacent(this.highlightedId, o)
        || mousedId && this.adjacent(o, mousedId)
        || this.relatedSearch(o)) {
        return this.unextended(o.name);
      } else {
        return this.abbreviate(o.name);
      }
    });
  }
  
  generateOpacity() {
    let opacity;
    if (this.highlightedId) {
      opacity = .1;
    } else if (this.hoveredId || this.clickedId) {
      opacity = .3;
    } else {
      opacity = this.searchedId ? .5 : 1;
    }
    const partialOpacity = .5;
    const linkFactor = .6;
    const mousedId = this.clickedId || this.hoveredId;

    this.node.style("opacity", (o) => {
      if (this.relatedSearch(o)) {
        return 1;
      } else if (this.adjacent(o, this.highlightedId)) {
        return 1;
      } else if (this.adjacent(o, mousedId)) {
        return this.highlightedId ? partialOpacity : 1;
      } else {
        return opacity;
      }
    });
    this.node.style("stroke", (o) => {
      if (o.id === this.highlightedId) {
        return "#ccf";
      } else if (o.id === mousedId) {
        return "#99c";
      } else if (this.relatedSearch(o)) {
        return "#7b7";
      } else {
        return "#232b42";
      }
    });
    this.link.style("opacity", (o) => {
      if (this.highlightedId === o.source.id || this.highlightedId === o.target.id) {
        return linkFactor;
      } else if (mousedId === o.source.id || mousedId === o.target.id) {
        return this.highlightedId ? linkFactor * .7 : linkFactor;
      } else {
        return linkFactor * opacity;
      }
    });
    this.text.style("opacity", (o) => {
      if (this.relatedSearch(o) || this.adjacent(o, this.highlightedId)) {
        return 1;
      } else if (this.adjacent(o, mousedId)) {
        return this.highlightedId ? partialOpacity : 1;
      } else {
        return opacity;
      }
    });
  }
  
  relatedSearch(d) {
    if (!this.searchedId) {
      return false;
    }

    let name = d.name.toLowerCase();
    let query = this.searchedId.toLowerCase().split(" ");
    for (let i = 0; i < query.length; i++) {
      if (!name.includes(query[i])) {
        return false;
      }
    }
    return true;
  }

  // EVENT LISTENERS - SEARCH / PAUSE ====================

  handleSearch() {
    if (!this.node) {
      return
    }
    this.generateOpacity();
    this.generateText();
  }

  handleClearSearch() {
    this.searchedId = "";
    if (!this.node) {
      return
    }
    this.generateOpacity();
    this.generateText();
  }

  handlePause() {
    if (!this.node) {
      return
    }
    if (this.paused) {
      this.paused = false;
      this.node.each((d) => {
        d.fx = null;
        d.fy = null;
      });
    } else {
      this.paused = true;
      this.node.each((d) => {
        d.fx = d.x;
        d.fy = d.y;
      });
    }
  }
  

  // MISC HELPER METHODS ============================

  color(d) {
    const group = d.group;
    const colors = [
      "#9e6bba",
      "#309b55",
      "#4286f4",
      "#6a7384",
      "#844040",
      "#c49c25"
    ];
    return colors[group % 6];
  }

  abbreviate(name) {
    let abb;
    const extensionless = name.match(/(.*)\.[jt]s/)[1];
    const split = extensionless.split(/[-_\.]/);
    if (split.length > 1) {
      return split.map(word => word[0]).join("");
    } else {
      return name[0] + extensionless.slice(1).split(/[a-z]/).join("");
    }
  }

  unextended(name) {
    return name.match(/^(.*)\.[A-Za-z]+$/)[1];
  }

  distance(d) {
    const offset = d.target.r + d.source.r;
    const containerless = (name) => name.split(/(_container)|\./)[0];
    if (containerless(d.source.id) === containerless(d.target.id)) {
      return 60 + offset;
    }
    let distanceDenom = 200 + Math.min(this.graph.nodes.length * 2, 250);

    return 30000 / distanceDenom + offset;
  }
}
