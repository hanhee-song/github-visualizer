const fileParser = require('./file_parser.js');
const drawGraph = require('./draw_graph.js');
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;

const MESSAGE = `Instructions:

Click and drag to move nodes around.

Double-click a node to see its contents.

Double-click on the same node to return to the main view,
or double-click on a different node to select a new node.
`;

const svg = d3.select('.svg-main');

d3.json("./filetree.json", (e, graph) => {
  drawGraph(e, graph, "hanhee-song", "Slic", "frontend");
  setContentMessage(MESSAGE);
});
document.querySelector(".input-user").value = "hanhee-song";
document.querySelector(".input-repo").value = "slic";
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
        setContentMessage(MESSAGE);
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
});


const inputUrl = document.querySelector(".input-url");
const inputUser = document.querySelector(".input-user");
const inputRepo = document.querySelector(".input-repo");
const inputSubdir = document.querySelector(".input-subdir");

inputUrl.addEventListener("input", (e) => {
  parseUrl();
});

inputUser.addEventListener("input", (e) => {
  makeUrl();
});

inputRepo.addEventListener("input", (e) => {
  makeUrl();
});

inputSubdir.addEventListener("input", (e) => {
  makeUrl();
});

function parseUrl() {
  let urlTag = inputUrl.value.split("github.com")[1];
  if (urlTag) {
    const urlTagArr = urlTag.slice(1).split("/");
    inputUser.value = urlTagArr[0] ? urlTagArr[0] : "";
    inputRepo.value = urlTagArr[1] ? urlTagArr[1] : "";
    if (urlTagArr[2] === "tree" && urlTagArr[3] === "master"
      && urlTagArr[4]) {
      inputSubdir.value = urlTagArr[4];
    } else {
      inputSubdir.value = "";
    }
  }
}

function makeUrl() {
  let url = `https://github.com/${inputUser.value}`;
  if (inputRepo.value) {
    url += '/' + inputRepo.value;
  }
  if (inputSubdir.value) {
    url += '/tree/master/' + inputSubdir.value;
  }
  inputUrl.value = url;
}
