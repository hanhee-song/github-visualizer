import { GitApiService } from './../git-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d3-container',
  templateUrl: './d3-container.component.html',
  styleUrls: ['./d3-container.component.css']
})
export class D3ContainerComponent implements OnInit {

  constructor(
    private gitApiService: GitApiService
  ) {
    this.gitApiService.graphChange.subscribe(graph => {
      this.drawGraph(graph, "", "", "")
    })
  }

  ngOnInit() {
  }
  
  // D3 LIVES HERE =======================================
  // Todo: refactor this mess
  // There's a good deal of really messy code from back when this was
  // executed functional-style in a separate file
  
  drawGraph(graph, user, repo, subdir) {
    // generateHeader(graph, user, repo, subdir);
    // setContentMessage();

    const svg = d3.select('.svg-main');
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    const width = Number(svg.attr("width"));
    const height = Number(svg.attr("height"));
    let highlightedId = "";
    let hoveredId = "";
    let clickedId = "";
    let searchedId = "";
    let frozen = false;

    svg.on("click", unhighlightNode);

    const simulation = d3.forceSimulation()
      .force(
        "link", d3.forceLink()
          .distance(d => distance(d))
          .strength(1)
          .id((d) => d.id)
      )
      .force("charge", d3.forceManyBody(0))
      .force("collision", d3.forceCollide(10));

    // LINKS, NODES, AND TEXT =============================

    const link = svg.append("g")
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

    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graphNodes)
      .enter()
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      )
      .on("click", highlightNode)
      .on("mouseover", hoverNode)
      .on("mouseout", hoverNode);

    const text = svg.selectAll("text").filter(".label")
      .data(graphNodes)
      .enter()
      .append("text")
      .classed("label", true)
      .text((d) => abbreviate(d.name));

    simulation.nodes(graphNodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    // TICK FUNCTION ========================================

    function ticked() {
      const boundedX = (d) => {
        return Math.max(d.r, Math.min(width - d.r - 2, d.x));
      };
      const boundedY = (d) => {
        return Math.max(d.r, Math.min(height - d.r - 2, d.y));
      };

      const circumferenceHash = {};
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => {
          circumferenceHash[d.source.id + d.target.id] = getCircumferencePoint(d);
          return circumferenceHash[d.source.id + d.target.id][0];
        })
        .attr("y2", (d) => circumferenceHash[d.source.id + d.target.id][1]);

      node
        .attr("cx", (d) => {
          d.x = boundedX(d);
          return d.x;
        })
        .attr("cy", (d) => {
          d.y = boundedY(d);
          return d.y;
        });

      text
        .attr("x", (d) => d.x + 1 + d.r)
        .attr("y", (d) => d.y + 3);

      function getCircumferencePoint(d) {
        const tRadius = d.target.r;
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const gamma = Math.atan2(dy, dx);
        const tx = d.target.x - (Math.cos(gamma) * tRadius);
        const ty = d.target.y - (Math.sin(gamma) * tRadius);
        return [tx, ty];
      }
    }

    // NEIGHBOR HELPER METHODS ===========================

    const linkedById = {};
    for (let i = 0; i < graphNodes.length; i++) {
      linkedById[`${i},${i}`] = 1;
    }
    graph.links.forEach(d => {
      linkedById[`${d.source.id},${d.target.id}`] = 1;
    });

    function linkedIds(a, b) {
      return linkedById[`${a},${b}`];
    }

    function adjacent(o, d) {
      const oId = o.id ? o.id : o;
      const dId = d.id ? d.id : d;
      return linkedIds(oId, dId) || linkedIds(dId, oId) || oId === dId;
    }

    function relatedSearch(d) {
      if (!searchedId) {
        return false;
      }

      let name = d.name.toLowerCase();
      let query = searchedId.toLowerCase().split(" ");
      for (let i = 0; i < query.length; i++) {
        if (!name.includes(query[i])) {
          return false;
        }
      }
      return true;
    }

    // GENERATE TEXT / OPACITY ===========================

    function generateText() {
      const mousedId = clickedId || hoveredId;
      text.text((o) => {
        if (highlightedId && adjacent(highlightedId, o)
          || mousedId && adjacent(o, mousedId)
          || relatedSearch(o)) {
          return unextended(o.name);
        } else {
          return abbreviate(o.name);
        }
      });
    }

    function generateOpacity() {
      let opacity;
      if (highlightedId) {
        opacity = .1;
      } else if (hoveredId || clickedId) {
        opacity = .3;
      } else {
        opacity = searchedId ? .5 : 1;
      }
      const partialOpacity = .5;
      const linkFactor = .6;
      const mousedId = clickedId || hoveredId;

      node.style("opacity", (o) => {
        if (relatedSearch(o)) {
          return 1;
        } else if (adjacent(o, highlightedId)) {
          return 1;
        } else if (adjacent(o, mousedId)) {
          return highlightedId ? partialOpacity : 1;
        } else {
          return opacity;
        }
      });
      node.style("stroke", (o) => {
        if (o.id === highlightedId) {
          return "#ccf";
        } else if (o.id === mousedId) {
          return "#99c";
        } else if (relatedSearch(o)) {
          return "#7b7";
        } else {
          return "#232b42";
        }
      });
      link.style("opacity", (o) => {
        if (highlightedId === o.source.id || highlightedId === o.target.id) {
          return linkFactor;
        } else if (mousedId === o.source.id || mousedId === o.target.id) {
          return highlightedId ? linkFactor * .7 : linkFactor;
        } else {
          return linkFactor * opacity;
        }
      });
      text.style("opacity", (o) => {
        if (relatedSearch(o) || adjacent(o, highlightedId)) {
          return 1;
        } else if (adjacent(o, mousedId)) {
          return highlightedId ? partialOpacity : 1;
        } else {
          return opacity;
        }
      });
    }

    // HOVER / HIGHLIGHT / CLICK EFFECTS ===================

    function highlightNode(d) {
      d3.event.stopPropagation();
      if (!highlightedId || highlightedId !== d.id) {
        highlightedId = d.id;
        // setContentMessage(d.content);
        // generateHeader(graph, user, repo, subdir, d);
      } else {
        // setContentMessage();
        // generateHeader(graph, user, repo, subdir);
        highlightedId = "";
      }
      generateOpacity();
      generateText();
    }

    function unhighlightNode(d) {
      // setContentMessage();
      // generateHeader(graph, user, repo, subdir);
      highlightedId = "";
      generateOpacity();
      generateText();
    }

    function hoverNode(d) {
      if (hoveredId !== d.id) {
        hoveredId = d.id;
      } else {
        hoveredId = "";
      }
      generateOpacity();
      generateText();
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      clickedId = d.id;
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      clickedId = "";
      generateOpacity();
      generateText();
      if (!frozen) {
        d.fx = null;
        d.fy = null;
      }
    }

    // EVENT LISTENERS - SEARCH / PAUSE ====================

    // const topOptions = document.querySelector('.top-options');
    // let clone = topOptions.cloneNode();
    // while (topOptions.firstChild) {
    //   clone.appendChild(topOptions.firstChild);
    // }
    // topOptions.parentNode.replaceChild(clone, topOptions);

    // const search = document.getElementById('search');
    // search.addEventListener("input", handleSearch);
    // search.value = "";
    // document.getElementById('search-clear').addEventListener("click", handleClearSearch);
    // document.getElementById('pause-button').addEventListener("click", handlePause);
    // const icon = document.querySelector(".toggle-pause-icon");
    // icon.classList.add("fa-pause");
    // icon.classList.remove("fa-play");


    // function handleSearch(e) {
    //   searchedId = e.target.value;
    //   generateOpacity();
    //   generateText();
    // }

    // function handleClearSearch(e) {
    //   document.getElementById('search').value = "";
    //   search.value = "";
    //   searchedId = "";
    //   generateOpacity();
    //   generateText();
    // }

    // function handlePause(e) {
    //   if (frozen) {
    //     icon.classList.add("fa-pause");
    //     icon.classList.remove("fa-play");
    //     frozen = false;
    //     node.each((d) => {
    //       d.fx = null;
    //       d.fy = null;
    //     });
    //   } else {
    //     frozen = true;
    //     icon.classList.add("fa-play");
    //     icon.classList.remove("fa-pause");
    //     node.each((d) => {
    //       d.fx = d.x;
    //       d.fy = d.y;
    //     });
    //   }
    // }

    // MISC HELPER METHODS ============================

    function color(d) {
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

    function abbreviate(name) {
      let abb;
      const extensionless = name.match(/(.*)\.js/)[1];
      const split = extensionless.split(/[-_\.]/);
      if (split.length > 1) {
        return split.map(word => word[0]).join("");
      } else {
        return name[0] + extensionless.slice(1).split(/[a-z]/).join("");
      }
    }

    function unextended(name) {
      return name.match(/^(.*)\.[A-Za-z]+$/)[1];
    }

    function distance(d) {
      const offset = d.target.r + d.source.r;
      const containerless = (name) => name.split(/(_container)|\./)[0];
      if (containerless(d.source.id) === containerless(d.target.id)) {
        return 60 + offset;
      }
      let distanceDenom = 200 + Math.min(graph.nodes.length * 2, 250);

      return 30000 / distanceDenom + offset;
    }
  }


}
