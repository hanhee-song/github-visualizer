const svg = d3.select('.svg-main');

const width = Number(svg.attr("width"));
const height = Number(svg.attr("height"));

const simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id((d) => d.id))
  .force("charge", d3.forceManyBody())
  .force("radial", d3.forceRadial(100, width/2, height/2));

//

d3.json("../data/filetree.json", function(error, graph) {
  if (error) throw error;
  
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

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
