(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function makeRequest(method, url, key, headerKey, headerValue) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    if (headerKey) {
      request.setRequestHeader(headerKey, headerValue);
    }
    request.setRequestHeader("Authorization", "Basic " + btoa(`hanhee-song:${key}`));
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
// const repo = gh.getRepo("hanhee-song", "slic");
// repo.getContents("", "", true, (...args) => {
// });
// let sha;
// repo.getSha("", "", (err, result, request) => {
//   sha = result[0].sha;
// });

const graphJSON = {
  "nodes": [],
  "links": [],
};

function fileParser(user, repo, subtree, key) {
  return makeRequest(
    "GET",
    `https://api.github.com/repos/${user}/${repo}/commits`,
    key
  )
    .then(
    response => {
      return JSON.parse(response.responseText)[0].sha;
    }
  ).then(
    sha => {
      return makeRequest(
        "GET",
        `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=1`,
        key
      );
    }
  ).then(
    response => {
      const files = JSON.parse(response.responseText).tree.filter(file => {
        return file.path.split("/")[0] === subtree && file.path.split(".")[0] !== file.path;
      });
      
      let rootDirs = [];
      let rootDir;
      files.forEach((file) => {
        rootDir = parseRoot(file.path, subtree);
        if (!rootDirs.includes(rootDir)) rootDirs.push(rootDir);
      });
      // let counter = files.length
      let counter = 0;
      
      
      files.forEach((file) => {
        makeRequest("GET", file.url, true)
          .then(
            content => {
              let contentArr = content.responseText.split(/\r?\n/);
              const fileName = file.path.split("/")[file.path.split("/").length - 1];
              let node = {
                id: fileName,
                loc: contentArr.length,
                group: rootDirs.indexOf(parseRoot(file.path))
              };
              graphJSON.nodes.push(node);
              counter ++;
              
              if (counter === files.length) {
              }
            }
          );
      });
      // iterate over each file
      // send a GET request to the blob with "setHeader" as true
      // on completion of each promise, parse out internals
      // use response.responseText.split(/\r?\n/) to split into lines
      console.log(files);
    }
  );//.then(
  //   response => {
  //     // THIS WORKS!
  //     return makeRequest("GET", "https://api.github.com/repos/hanhee-song/slic/git/blobs/d9f9e52af68f027de6a4bcb8750f6426997cf289", "accept", "application/vnd.github.VERSION.raw");
  //   }
  // ).then(
  //   response => {
  //   }
  // );
  //
}

function parseRoot(path, subtree) {
  let splitPath = path.split("/");
  let rootDir;
  if (splitPath[0] === subtree) {
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

//
// function parseResponse () {
//
// }

// repo.getTree();

// repo.getContents("", "", true, (...args) => {
// });

module.exports = fileParser;

},{}],2:[function(require,module,exports){
var githubKey = config.GITHUB_API_KEY;

const fileParser = require('./file_parser.js');
// console.log("fileParser");

fileParser("hanhee-song", "slic", "frontend", githubKey);

const svg = d3.select('.svg-main');

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
  .force("collision", d3.forceCollide());

//

d3.json("./filetree.json", function(error, graph) {
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
      .attr("r", (d) => Math.sqrt(d.loc))
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
    .text((d) => abbreviate(d.id));
  
  // const tooltip = svg.selectAll("text").filter(".tooltip")
  //   .data(graph.nodes)
  //   .enter()
  //   .append("text")
  //   .classed("tooltip", true)
  //   .text(d => generateTooltip(d))
  //     .attr("opacity", ".5");
  
  simulation.nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);

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
    
    // tooltip
    //   .attr("x", (d) => d.x + 1 + Math.sqrt(d.loc))
    //   .attr("y", (d) => d.y + 3)
    //   .text(d => generateTooltip(d));
    
    // console.log(selectedTooltip);
    function getCircumferencePoint(d) {
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
          ? unextended(o.id) : abbreviate(o.id);
      });
      highlighted = d.id;
    } else {
      node.style("opacity", 1);
      link.style("opacity", .6);
      text.style("opacity", 1);
      text.text((o) => abbreviate(o.id));
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
        return unextended(o.id);
      }
      if (highlighted && (neighboringIds(o.id, highlighted) ||
        neighboringIds(highlighted, o.id)) || highlighted === o.id) {
        return unextended(o.id);
      }
      if (selectedTooltip && highlighted && (neighboring(o, d) ||
        neighboring(d, o) || o.id === d.id)) {
        return unextended(o.id);
      }
      return abbreviate(o.id);
    });
  }
  
  // function generateTooltip(d) {
  //   if (d.id === selectedTooltip) {
  //     return d.id.split(".")[0];
  //   }
  // }
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
  const colors = [
    "#4286f4",
    "#309b55",
    "#4286f4",
    "#9e6bba",
    "#6a7384",
    "#844040",
    "#c49c25"
  ];
  return colors[group];
}

function abbreviate(name) {
  return name.split("_").map((word) => word[0]).join("");
}

function unextended(name) {
  return name.split(".")[0];
}

function distance(d) {
  const offset = Math.sqrt(d.target.loc) + Math.sqrt(d.source.loc);
  const sourceId = d.source.id.split("_");
  const targetId = d.target.id.split("_");
  const containerless = (name) => name.split("_container").join("").split(".")[0];
  
  if (containerless(d.source.id) === containerless(d.target.id)) {
    return 10 + offset;
  } else if (sourceId[0] === targetId[0]) {
    return 15 + offset;
}
  return 20 + offset;
}

},{"./file_parser.js":1}]},{},[2]);
