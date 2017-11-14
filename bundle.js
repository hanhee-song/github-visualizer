(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;

const svg = d3.select('.svg-main');


const drawGraph = (error, graph, user, repo, subdir) => {
  generateHeader(graph, user, repo, subdir);
  setContentMessage();
  
  svg.selectAll("g").remove();
  svg.selectAll("text").remove();
  const width = Number(svg.attr("width"));
  const height = Number(svg.attr("height"));
  let highlighted = "";
  let selectedTooltip = "";
  
  const simulation = d3.forceSimulation()
  .force(
    "link", d3.forceLink()
    .distance(d => distance(d)/2)
    .strength(1)
    .id((d) => d.id)
  )
  .force("charge", d3.forceManyBody(0))
  .force("center", d3.forceCenter(width/2, height/2))
  .force("collision", d3.forceCollide(10));
  
  
  if (error) throw error;
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
  
  
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
      .attr("r", (d) => radius(d.loc))
      .attr("fill", (d) => color(d))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      ).on("dblclick", highlightNodes)
      .on("mouseover", generateText)
      .on("mouseout", generateText);
  
  const text = svg.selectAll("text").filter(".label")
    .data(graph.nodes)
    .enter()
    .append("text")
    .classed("label", true)
    .text((d) => abbreviate(d.name));
  
  simulation.nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);

  function ticked() {
    const boundedX = (d) => {
      return Math.max(radius(d.loc), Math.min(width - radius(d.loc) - 2, d.x));
    };
    const boundedY = (d) => {
      return Math.max(radius(d.loc), Math.min(height - radius(d.loc) - 2, d.y));
    };
    
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => getCircumferencePoint(d)[0])
      .attr("y2", (d) => getCircumferencePoint(d)[1]);
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
      .attr("x", (d) => d.x + 1 + radius(d.loc))
      .attr("y", (d) => d.y + 3);
    
    function getCircumferencePoint(d) {
      const tRadius = radius(d.target.loc);
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
  
  const linkedById = {};
  for (var i = 0; i < graph.nodes.length; i++) {
    linkedById[`${i},${i}`] = 1;
  }
  graph.links.forEach(d => {
    linkedById[`${d.source.id},${d.target.id}`] = 1;
  });
  const neighboring = (a, b) => linkedById[`${a.id},${b.id}`];
  const neighboringIds = (a, b) => linkedById[`${a},${b}`];
  
  function highlightNodes(d) {
    if (!highlighted || highlighted !== d.id) {
      node.style("opacity", (o) => {
        return neighboring(o, d) || neighboring(d, o) || o.id === d.id
          ? 1 : .2;
      });
      link.style("opacity", (o) => {
        return d.id === o.source.id || d.id === o.target.id ? .7 : .14;
      });
      text.style("opacity", (o) => {
        return neighboring(o, d) || neighboring(d, o) || o.id === d.id
          ? 1 : .2;
      });
      text.text((o) => {
        return neighboring(o, d) || neighboring(d, o) || o.id === d.id
          ? unextended(o.name) : abbreviate(o.name);
      });
      highlighted = d.id;
      setContentMessage(d.content);
      generateHeader(graph, user, repo, subdir, d);
    } else {
      setContentMessage();
      generateHeader(graph, user, repo, subdir);
      node.style("opacity", 1);
      link.style("opacity", .6);
      text.style("opacity", 1);
      text.text((o) => abbreviate(o.name));
      highlighted = "";
    }
  }
  
  
  function generateText(d) {
    if (selectedTooltip !== d.id) {
      selectedTooltip = d.id;
    } else {
      selectedTooltip = "";
    }
    text.text((o) => {
      if (selectedTooltip && o.id === d.id) {
        return unextended(o.name);
      }
      if (highlighted && (neighboringIds(o.id, highlighted) ||
        neighboringIds(highlighted, o.id)) || highlighted === o.id) {
        return unextended(o.name);
      }
      if (selectedTooltip && highlighted && (neighboring(o, d) ||
        neighboring(d, o) || o.id === d.id)) {
        return unextended(o.name);
      }
      return abbreviate(o.name);
    });
  }
  
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
    abb = name.split("_").map((word) => word[0]).join("");
    if (abb.length === 1) {
      abb = name.split("-").map((word) => word[0]).join("");
    }
    return abb;
  }
  
  function unextended(name) {
    return name.split(".")[0];
  }
  
  function distance(d) {
    const offset = radius(d.target.loc) + radius(d.source.loc);
    const sourceId = d.source.id.split("_");
    const targetId = d.target.id.split("_");
    const containerless = (name) => name.split("_container").join("").split(".")[0];
    
    if (containerless(d.source.id) === containerless(d.target.id)) {
      return 50 + offset;
    } else if (sourceId[0] === targetId[0]) {
      return 105 + offset;
    }
    return 180 + offset;
  }
  
  function radius(loc) {
    return Math.sqrt(loc * 2 + 25);
  }
};

module.exports = drawGraph;

},{"./sidebar.js":4}],2:[function(require,module,exports){
function fileParser(user, repo, subdir, key="") {
  const graphJSON = {
    "nodes": [],
    "links": [],
  };
  return makeRequest(
    "GET",
    `https://api.github.com/repos/${user}/${repo}/commits`,
    key
  ).then(
    response => JSON.parse(response.responseText)[0].sha,
    error => ["Invalid username or repo"]
  ).then(
    sha => makeRequest(
        "GET",
        `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=1`,
        key
      )
  ).then(
    response => {
      const files = parseTree(response, subdir);
      const rootDirs = parseRootDirs(files, subdir);
      
      let counter = 0;
      let fileErrors = 0;
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        makeRequest("GET", file.url, "", "accept", "application/vnd.github.VERSION.raw")
          .then(
            response => {
              let content = response.responseText;
              const contentArr = content.split(/\r?\n/);
              const fileName = parseName(file.path);
              let links = parseLinks(file.path, contentArr);
              let node = {
                id: noExtension(file.path),
                name: fileName,
                extension: extension(file.path),
                loc: contentArr.length,
                group: rootDirs.indexOf(parseRoot(file.path, subdir)),
                content: content
              };
              graphJSON.nodes.push(node);
              graphJSON.links = graphJSON.links.concat(links);
              counter ++;
            },
            error => {
              fileErrors++;
            }
          );
      }
      
      return new Promise(function(resolve, reject) {
        (function waitForFiles() {
          if (counter + fileErrors === files.length) {
            return resolve(
              sanitizeGraph(graphJSON)
            );
          }
          setTimeout(waitForFiles, 30);
        })();
      });
      
    }
  );
}

////////////////////

function makeRequest(method, url, key, headerKey, headerValue) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    if (headerKey) {
      request.setRequestHeader(headerKey, headerValue);
    }
    request.setRequestHeader("Authorization", `Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==`);
    request.onload = function() {
      if (this.status === 200) {
        resolve(request);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText
        });
      }
    };
    request.onerror = function () {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    };
    request.send();
  });
}
///////////////////

function parseName(path) {
  return path.split("/")[path.split("/").length - 1].split(".")[0]
    .split("'")[0].split("\"")[0];
}

function extension(path) {
  return path.split(".")[path.split(".").length - 1];
}

function forbiddenFile(path) {
  return parseName(path) === "bundle"
  || (extension(path) !== "js"
  && extension(path) !== "jsx");
}

function parseRoot(path, subdir) {
  let splitPath = path.split("/");
  let rootDir;
  if (splitPath[0] === subdir) {
    if (splitPath[1].split(".")[0] === splitPath[1]) {
      rootDir = splitPath[1];
    } else {
      rootDir = "";
    }
  } else {
    rootDir = splitPath[0];
  }
  return rootDir;
}

function parseRootDirs(files, subdir) {
  let rootDirs = [];
  let rootDir;
  files.forEach((file) => {
    rootDir = parseRoot(file.path, subdir);
    if (!rootDirs.includes(rootDir)) rootDirs.push(rootDir);
  });
  return rootDirs;
}

function parsePath(filePath, line) {
  let lineArr = line.split("'");
  if (lineArr.length === 1) {
    lineArr = line.split("\"");
  }
  let segment;
  lineArr.forEach(section => {
    if (section.includes("./")) segment = section;
  });
  
  let sectionArr = segment.split("/");
  let filePathArr = filePath.split("/");
  filePathArr.pop();
  let newPath;
  sectionArr.forEach(section => {
    if (section === '..') {
      filePathArr.pop();
    } else if (section !== ".") {
      filePathArr.push(section);
    }
  });
  
  return filePathArr.join("/");
}

function parseTree(response, subdir) {
  return JSON.parse(response.responseText).tree.filter(file => {
    if (forbiddenFile(file.path)) {
      return false;
    }
    if (subdir) {
      return file.path.split("/")[0] === subdir && file.path.split(".")[0] !== file.path;
    } else if (subdir === "") {
      return file.path.split(".")[0] !== file.path;
    }
  });
}

function noExtension(filePath) {
  return filePath.split(".")[0];
}

function parseLinks(filePath, contentArr) {
  let links = [];
  for (var i = 0; i < contentArr.length; i++) {
    if (
      (contentArr[i].includes("from '")
      || contentArr[i].includes("from \"")
      || contentArr[i].includes("require(")
      || contentArr[i].includes("require ("))
      && contentArr[i].includes("./")
      && contentArr[i].slice(0, 2) !== "//"
      && contentArr[i].slice(0, 2) !== "/*"
      && parseName(contentArr[i]) !== "") {
      links.push({
        "source": noExtension(parsePath(filePath, contentArr[i])),
        "target": noExtension(filePath)
      });
    }
  }
  return links;
}

function sanitizeGraph(graph) {
  let newGraph = {
    "links": [],
    "nodes": graph.nodes
  };
  const names = graph.nodes.map(node => node.id);
  
  graph.links.forEach(link => {
    if (names.includes(link.source) && names.includes(link.target)) {
      newGraph.links.push(link);
    }
  });
  
  return newGraph;
}

module.exports = fileParser;

},{}],3:[function(require,module,exports){
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
let loading = false;

const svg = d3.select('.svg-main');

d3.json("./filetree.json", (e, graph) => {
  drawGraph(e, graph, "hanhee-song", "Slic", "frontend");
  setContentMessage(MESSAGE);
});
document.querySelector(".input-user").value = "hanhee-song";
document.querySelector(".input-repo").value = "slic";
document.querySelector(".input-subdir").value = "frontend";

const submitGraph = (user, repo, subdir = "") => {
  if (loading === true) {
    return;
  }
  loading = true;
  fileParser(user, repo, subdir)
  .then(
    response => {
      loading = false;
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
      loading = false;
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
      setContentMessage("Loading repo...");
    }
  });
});

},{"./draw_graph.js":1,"./file_parser.js":2,"./sidebar.js":4}],4:[function(require,module,exports){
function generateHeader(graph, user, repo, subdir, d) {
  const header = document.querySelector(".sidebar-header");
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }
  
  let totalLines = 0;
  graph.nodes.forEach(node => {
    totalLines += node.loc;
  });
  
  const linkText = document.createTextNode(`https://api.github.com/repos/${user}/${repo}/${subdir}`);
  const userText = document.createTextNode(`     Current user: ${user}`);
  const repoText = document.createTextNode(`     Current repo: ${repo}`);
  const subdirText = document.createTextNode(`   Current subdir: ${subdir}`);
  const linesText = document.createTextNode(`      Total lines: ${totalLines}`);
  let textArr = [linkText, userText, repoText, subdirText, linesText];
  
  if (d) {
    const fileNameText = document.createTextNode(`Current directory: ${d.id}.${d.extension}`);
    const fileLoc = document.createTextNode(`    Current lines: ${d.loc}`);
    textArr = textArr.concat([fileNameText, fileLoc]);
  }
  
  textArr.forEach((textNode) => {
    header.append(textNode);
    header.append(document.createTextNode("\n"));
  });
}

function setContentMessage(content) {
  const fileBox = document.querySelector(".file-content");
  while (fileBox.firstChild) {
    fileBox.removeChild(fileBox.firstChild);
  }
  let text;
  if (content === undefined) {
    text = "Double-click a node to see its contents!";
  } else if (content === "") {
    text = "This file is empty!";
  } else {
    text = content;
  }
  
  let textNode = document.createTextNode(text);
  fileBox.appendChild(textNode);
}
module.exports = {
  generateHeader,
  setContentMessage
};

},{}]},{},[3]);
