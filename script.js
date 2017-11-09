const svg = d3.select('.svg-main');

const width = Number(svg.attr("width"));
const height = Number(svg.attr("height"));

const simulation = d3.forceSimulation()
  .force(
    "link", d3.forceLink()
      .distance(d => distance(d))
      .strength(.5)
      .id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width/2, height/2));

//

d3.json("./filetree.json", function(error, graph) {
  if (error) throw error;
  
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("marker-end", (d) => `url(#marker_${d.id})`);

  svg.append("svg:defs").selectAll("marker")
    .data(graph.links)
    .enter().append("svg:marker")
      .attr("id", (d) => `marker_${d.id}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
  
  
  
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
      .attr("r", (d) => Math.sqrt(d.loc))
      .attr("fill", (d) => color(d))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );
  
  const text = svg.selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .text((d) => abbreviate(d.id));
  
  simulation.nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);
    // .on("tick", ticked); // ?

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => getCircumferencePoint(d)[0])
      .attr("y2", (d) => getCircumferencePoint(d)[1]);
    node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    text
      .attr("x", (d) => d.x + 1 + Math.sqrt(d.loc))
      .attr("y", (d) => d.y + 3);
    
    function getCircumferencePoint(d) {
      // debugger;
      const tRadius = Math.sqrt(d.target.loc);
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const gamma = Math.atan2(dy, dx);
      const tx = d.target.x - (Math.cos(gamma) * tRadius);
      const ty = d.target.y - (Math.sin(gamma) * tRadius);
      return [tx, ty];
    }
  }
  
  function pointerDistance(d) {
    const targetId = d.target;
    for (var i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i].id === targetId) {
        return graph.nodes[i].loc;
      }
    }
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  d.fx = null;
  d.fy = null;
}

function color(d) {
  const group = d.group;
  const colors = "red green blue purple".split(" ");
  debugger;
  return colors[group];
}

function abbreviate(name) {
  // return name.split("_").map((word) => word[0]).join("");
  return name.split(".")[0];
}

function distance(d) {
  const offset = Math.sqrt(d.source.loc);
  const sourceId = d.source.id.split("_");
  const targetId = d.target.id.split("_");
  const containerless = (name) => name.split("_container").join("").split(".")[0];
  
  if (containerless(d.source.id) === containerless(d.target.id)) {
    return 10 + offset;
  } else if (sourceId[0] === targetId[0]) {
    return 30 + offset;
}
  return 50 + offset;
}
