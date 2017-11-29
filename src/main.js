const fileParser = require('./file_parser.js');
const drawGraph = require('./draw_graph.js');
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;

let loading = false;

const svg = d3.select('.svg-main');

document.querySelector(".input-user").value = "reactjs";
document.querySelector(".input-repo").value = "redux";
document.querySelector(".input-subdir").value = "src";

submitGraph("reactjs", "redux", "src");

function submitGraph(user, repo, subdir = "") {
  if (loading === true) {
    return;
  }
  loading = true;
  setContentMessage("Fetching repo from Github...");
  fileParser(user, repo, subdir)
  .then(
    response => {
      setTimeout(function () {
        loading = false;
        const graph = response;
        d3.selectAll("svg > *").remove();
        svg.data(graph);
        drawGraph(null, graph, user, repo, subdir);
        if (graph.nodes.length === 0) {
          setContentMessage("No .js or .jsx files found...");
        } else {
          setContentMessage();
        }
      }, 1400);
    },
    error => {
      loading = false;
      if (error.status === 600) {
        setContentMessage(`Repo too large: ${error.statusText} files found.

There is a limit of 200 files to avoid flooding the Github servers.

Maybe specify a subdirectory?`);
      } else if (error.status === 403) {
        setContentMessage(`403: Rate limit in effect.\n
You are seeing this message because the Github API has a
limit of 5000 requests per hour, and users have recently
made 5000 requests with this visualizer.
Please try again in an hour.`);
      } else {
        setContentMessage("404: Sorry, we couldn't find that repo!");
      }
    }
  );
}

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.querySelector(".input-user").value;
  const repo = document.querySelector(".input-repo").value;
  const subdir = document.querySelector(".input-subdir").value;
  
  submitGraph(user, repo, subdir);
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
  let urlTag = inputUrl.value.match(/github\.com\/(.*)/);
  if (urlTag) {
    const urlTagArr = urlTag[1].split("/");
    inputUser.value = urlTagArr[0] ? urlTagArr[0] : "";
    inputRepo.value = urlTagArr[1] ? urlTagArr[1] : "";
    if (urlTagArr[2] === "tree" && urlTagArr[3] === "master"
      && urlTagArr[4]) {
      inputSubdir.value = urlTagArr.slice(4).join("/");
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

const examples = {
  "express": {
    "user": "expressjs",
    "repo": "express",
    "subdir": "lib",
  },
  "redux": {
    "user": "reactjs",
    "repo": "redux",
    "subdir": "src",
  },
  "react": {
    "user": "facebook",
    "repo": "react",
    "subdir": "scripts",
  },
  "slic": {
    "user": "hanhee-song",
    "repo": "slic",
    "subdir": "frontend",
  },
};

const buttonExamples = document.querySelectorAll(".button-example");
buttonExamples.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (loading === false) {
      const repo = examples[e.target.getAttribute("repo")];
      inputUser.value = repo.user;
      inputRepo.value = repo.repo;
      inputSubdir.value = repo.subdir;
      makeUrl();
      submitGraph(repo.user, repo.repo, repo.subdir);
    }
  });
});

const helpButton = document.querySelector(".button-help");
const helpModalContainer = document.querySelector(".help-modal-container");
const helpModalText = document.querySelector(".help-modal-text");
const helpModalX = document.querySelector(".help-modal-x");

helpButton.addEventListener("click", (e) => {
  helpModalContainer.classList.add("visible");
});

helpModalContainer.addEventListener("click", (e) => {
  helpModalContainer.classList.remove("visible");
});

helpModalX.addEventListener("click", (e) => {
  helpModalContainer.classList.remove("visible");
});

helpModalText.addEventListener("click", (e) => {
  e.stopPropagation();
});
