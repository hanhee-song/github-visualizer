(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const sidebarFunctions = require('./sidebar.js');
const generateHeader = sidebarFunctions.generateHeader;
const setContentMessage = sidebarFunctions.setContentMessage;

function drawGraph(error, graph, user, repo, subdir) {
  generateHeader(graph, user, repo, subdir);
  setContentMessage();
  
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
  for (var i = 0; i < graph.nodes.length; i++) {
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
  for (var i = 0; i < graphNodes.length; i++) {
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
    for (var i = 0; i < query.length; i++) {
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
      setContentMessage(d.content);
      generateHeader(graph, user, repo, subdir, d);
    } else {
      setContentMessage();
      generateHeader(graph, user, repo, subdir);
      highlightedId = "";
    }
    generateOpacity();
    generateText();
  }
  
  function unhighlightNode(d) {
    setContentMessage();
    generateHeader(graph, user, repo, subdir);
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
  
  const topOptions = document.querySelector('.top-options');
  var clone = topOptions.cloneNode();
  while (topOptions.firstChild) {
    clone.appendChild(topOptions.firstChild);
  }
  topOptions.parentNode.replaceChild(clone, topOptions);
  
  const search = document.getElementById('search');
  search.addEventListener("input", handleSearch);
  search.value = "";
  document.getElementById('search-clear').addEventListener("click", handleClearSearch);
  document.getElementById('pause-button').addEventListener("click", handlePause);
  const icon = document.querySelector(".toggle-pause-icon");
  icon.classList.add("fa-pause");
  icon.classList.remove("fa-play");
  
  
  function handleSearch(e) {
    searchedId = e.target.value;
    generateOpacity();
    generateText();
  }
  
  function handleClearSearch(e) {
    document.getElementById('search').value = "";
    search.value = "";
    searchedId = "";
    generateOpacity();
    generateText();
  }
  
  function handlePause(e) {
    if (frozen) {
      icon.classList.add("fa-pause");
      icon.classList.remove("fa-play");
      frozen = false;
      node.each((d) => {
        d.fx = null;
        d.fy = null;
      });
    } else {
      frozen = true;
      icon.classList.add("fa-play");
      icon.classList.remove("fa-pause");
      node.each((d) => {
        d.fx = d.x;
        d.fy = d.y;
      });
    }
  }
  
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

module.exports = drawGraph;

},{"./sidebar.js":4}],2:[function(require,module,exports){
const sidebarFunctions = require('./sidebar.js');
const setContentMessage = sidebarFunctions.setContentMessage;

function fileParser(user, repo, subdir, key="") {
  const graphJSON = {
    "nodes": [],
    "links": [],
  };
  return makeRequest(
    "GET",
    `https://api.github.com/repos/${user}/${repo}/commits`,
    key
  )
  .then(
    response => JSON.parse(response.responseText)[0].sha,
    error => ["Invalid username or repo"]
  )
  .then(
    sha => makeRequest(
        "GET",
        `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=1`,
        key
      )
  )
  .then(
    response => {
      const files = parseTree(response, subdir);
      
      if (files.length > 200) {
        return new Promise(function(resolve, reject) {
          return reject({
            status: 600,
            statusText: `${files.length}`
          });
        });
      }
      setMessage(files.length, 0, 0, 0);
      
      const rootDirs = parseRootDirs(files, subdir);
      const filePathSet = new Set(Object.values(files).map((file) => {
        return file.path;
      }));
      let parsed = 0;
      let fetched = 0;
      let fileErrors = 0;
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        makeRequest("GET", file.url, "", "accept", "application/vnd.github.VERSION.raw")
          .then(
            response => {
              fetched++;
              setMessage(files.length, fetched, parsed, fileErrors);
              let content = response.responseText;
              const contentArr = content.split(/\r?\n/);
              const fileName = parseName(file.path);
              let links = parseLinks(file.path, contentArr, filePathSet);
              let node = {
                id: file.path,
                name: fileName,
                extension: extension(file.path),
                loc: contentArr.length,
                group: rootDirs.indexOf(parseRoot(file.path, subdir)),
                content: content
              };
              graphJSON.nodes.push(node);
              graphJSON.links = graphJSON.links.concat(links);
              parsed++;
              setMessage(files.length, fetched, parsed, fileErrors);
            },
            error => {
              fileErrors++;
            }
          );
      }
      
      return new Promise(function(resolve, reject) {
        (function waitForFiles() {
          if (parsed + fileErrors === files.length) {
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
  const splitPath = path.split("/");
  return splitPath[splitPath.length - 1];
}

function extension(path) {
  const splitPath = path.split(".");
  return splitPath[splitPath.length - 1];
}

function forbiddenFile(path) {
  const parsedName = parseName(path);
  const ext = extension(path);
  return parsedName === "bundle.js"
  || parsedName === "bundle.js.map"
  || (ext !== "js"
  && ext !== "jsx");
}

function parseRoot(path, subdir) {
  let pathArr = path.split("/");
  let subArr = subdir.split("/");
  if (subArr[subArr.length - 1] === pathArr[subArr.length - 1]) {
    return pathArr[subArr.length] ? pathArr[subArr.length] : pathArr[subArr.length - 1];
  } else {
    return pathArr[0];
  }
}

function parseRootDirs(files, subdir) {
  let rootDirs = new Set();
  files.forEach((file) => {
    rootDirs.add(parseRoot(file.path, subdir));
  });
  return Array.from(rootDirs);
}

function parsePath(filePath, parsedImport, filePathSet) {
  let sectionArr = parsedImport.split("/");
  let pathArr = filePath.split("/");
  pathArr.pop();
  let newPath;
  sectionArr.forEach(section => {
    if (section === '..') {
      pathArr.pop();
    } else if (section !== ".") {
      pathArr.push(section);
    }
  });
  
  const combinedPath = pathArr.join("/");
  if (filePathSet.has(combinedPath)) {
    return combinedPath;
  } else if (filePathSet.has(combinedPath + ".jsx")) {
    return combinedPath + ".jsx";
  } else {
    return combinedPath + ".js";
  }
}

function parseTree(response, subdir) {
  return JSON.parse(response.responseText).tree.filter(file => {
    if (forbiddenFile(file.path)) {
      return false;
    }
    if (subdir) {
      const splitSubdir = subdir.split("/");
      const splitPath = file.path.split("/");
      for (var i = 0; i < splitSubdir.length; i++) {
        if (splitSubdir[i] !== splitPath[i]) {
          return false;
        }
      }
    }
    return true;
  });
}

function parseLinks(filePath, contentArr, filePathSet) {
  let links = [];
  for (var i = 0; i < contentArr.length; i++) {
    const line = contentArr[i];
    // Match 'from' or 'require' statements with './'
    const regex = line.match(/((from)|(require\s*\())\s*['"]([^'"]*\.\/[^'"]*)['"]/);
    if (regex && !line.match(/^.{0,7}\/[\*\/]/)) {
      links.push({
        "source": parsePath(filePath, regex[regex.length - 1], filePathSet),
        "target": filePath
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
  const names = new Set(graph.nodes.map(node => node.id));
  
  graph.links.forEach(link => {
    if (names.has(link.source) && names.has(link.target)) {
      newGraph.links.push(link);
    }
  });
  
  return newGraph;
}

function setMessage(total, fetched, parsed, errors) {
  let finishedMessage = "";
  if (total === parsed + errors) {
    finishedMessage = "Repository loaded!";
  }
  setContentMessage(`Repo found. Fetching and parsing files...
    
   Fetched files: ${fetched} / ${total}
    Parsed files: ${parsed} / ${total}
Unparsable files: ${errors}

${finishedMessage}`);
}

// Utility function for finding rate limit, currently not being used
function logRateLimit() {
  return makeRequest("GET", `https://api.github.com/rate_limit`)
    .then(
      response => {
        console.log(JSON.parse(response.response).resources.core.remaining);
        return JSON.parse(response.response).resources.core.remaining;
      }
    );
}

module.exports = fileParser;

},{"./sidebar.js":4}],3:[function(require,module,exports){
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
  const filesText = document.createTextNode(`      Total files: ${graph.nodes.length}`);
  let textArr = [linkText, userText, repoText, subdirText, linesText, filesText];
  
  if (d) {
    const fileNameText = document.createTextNode(`Current directory: ${d.id}`);
    const fileLoc = document.createTextNode(`    Current lines: ${d.loc}`);
    textArr = textArr.concat([fileNameText, fileLoc]);
  }
  
  textArr.forEach((textNode) => {
    header.append(textNode);
    header.append(document.createTextNode("\n"));
  });
}

const MESSAGE = `INSTRUCTIONS:

* Click and drag to move nodes around.

* Click on a node to see its contents.

* Click on the same node or the background to return
to the main view, or click on a different node to
select a new node.

* Search a file using the search box: to find a file
named "message_form_container.jsx", it's enough to
search for "mes form cont".

* Press pause to pause the simulation.`;

function setContentMessage(content) {
  const fileBox = document.querySelector(".file-content");
  while (fileBox.firstChild) {
    fileBox.removeChild(fileBox.firstChild);
  }
  let text;
  if (content === undefined) {
    text = MESSAGE;
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
