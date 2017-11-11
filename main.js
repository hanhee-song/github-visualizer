const fileParser = require('./file_parser.js');
const drawGraph = require('./draw_graph');
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;


const svg = d3.select('.svg-main');

fileParser("hanhee-song", "Slic", "frontend")
.then(
  response => {
    const graph = response;
    svg.data(graph);
    drawGraph(null, graph, "hanhee-song", "Slic", "frontend");
  },
  error => {
    setContentMessage("Sorry, we couldn't find that repo!");
  }
);

d3.json("./filetree.json", (e, graph) => drawGraph(e, graph));
