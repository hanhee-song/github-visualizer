const fileParser = require('./file_parser.js');
const drawGraph = require('./draw_graph.js');
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;


const svg = d3.select('.svg-main');

d3.json("./filetree.json", (e, graph) => {
  drawGraph(e, graph);
  generateHeader(graph, "hanhee-song", "Slic", "frontend");
});


const submitGraph = (user, repo, subdir = "") => {
  fileParser(user, repo, subdir)
  .then(
    response => {
      const graph = response;
      svg.data(graph);
      drawGraph(null, graph);
      generateHeader(graph, user, repo, subdir);
    },
    error => {
      setContentMessage("Sorry, we couldn't find that repo!");
    }
  );
};
