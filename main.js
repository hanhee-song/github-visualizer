const fileParser = require('./file_parser.js');
const drawGraph = require('./draw_graph.js');
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;


const svg = d3.select('.svg-main');
let loading = false;

d3.json("./filetree.json", (e, graph) => {
  drawGraph(e, graph, "hanhee-song", "Slic", "frontend");
  setContentMessage("Double-click a node to see its contents!");
});
document.querySelector(".input-user").value = "hanhee-song";
document.querySelector(".input-repo").value = "Slic";
document.querySelector(".input-subdir").value = "frontend";

const submitGraph = (user, repo, subdir = "") => {
  fileParser(user, repo, subdir)
  .then(
    response => {
      const graph = response;
      d3.selectAll("svg > *").remove();
      svg.data(graph);
      drawGraph(null, graph, user, repo, subdir);
      if (graph.nodes.length === 0) {
        setContentMessage("No .js or .jsx files found...");
      } else {
        setContentMessage("Double-click a node to see its contents!");
      }
    },
    error => {
      setContentMessage("Sorry, we couldn't find that repo!");
    }
  );
};

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.querySelector(".input-user").value;
  const repo = document.querySelector(".input-repo").value;
  const subdir = document.querySelector(".input-subdir").value;
  
  submitGraph(user, repo, subdir);
  setContentMessage("Loading repo...");
  loading = true;
});
