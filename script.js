const svg = d3.select('.svg-main');

const width = Number(svg.attr("width"));
const height = Number(svg.attr("height"));

const simulation = d3.forceSimulation()
  .force(
    "link", d3.forceLink()
      .distance(d => 60)
      .strength(1)
      .id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force("radial", d3.forceRadial(100, width/2, height/2));

//

d3.json("./filetree.json", function(error, graph) {
  if (error) throw error;
  
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      // .attr("stroke-width", (d) => Math.sqrt(d.value))
      .style("marker-end", "url(#end)");
  
  svg.append("svg:defs").selectAll("marker")
    .data(["end"])
    .enter().append("svg:marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1)
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
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );
  
  const text = svg.selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .text((d) => d.id);
  
  simulation.nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);
    // .on("tick", ticked); // ?

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    text
      .attr("x", (d) => d.x + 1 + Math.sqrt(d.loc))
      .attr("y", (d) => d.y);
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
