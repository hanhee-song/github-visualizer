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
      
      if (files.length > 200) {
        return new Promise(function(resolve, reject) {
          return reject({
            status: 600,
            statusText: `${files.length}`
          });
        });
      }
      
      const rootDirs = parseRootDirs(files, subdir);
      const filePathSet = new Set(Object.values(files).map((file) => {
        return file.path;
      }));
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
  const splitPath = path.split("/");
  return splitPath[splitPath.length - 1];
}

function extension(path) {
  const splitPath = path.split(".");
  return splitPath[splitPath.length - 1];
}

function forbiddenFile(path) {
  return parseName(path) === "bundle.js"
  || parseName(path) === "bundle.js.map"
  || (extension(path) !== "js"
  && extension(path) !== "jsx");
}

function parseRoot(path, subdir) {
  let splitPath = path.split("/");
  let rootDir;
  if (splitPath[0] === subdir) {
    rootDir = !splitPath[1].includes(".") ? splitPath[1] : "";
  } else {
    rootDir = splitPath[0];
  }
  return rootDir;
}

function parseRootDirs(files, subdir) {
  let rootDirs = new Set();
  let rootDir;
  files.forEach((file) => {
    rootDir = parseRoot(file.path, subdir);
    if (!rootDirs.has(rootDir)) rootDirs.add(rootDir);
  });
  return Array.from(rootDirs);
}

function parsePath(filePath, line, filePathSet) {
  const segment = line.match(/['"]([^'"]*\.\/[^'"]*)['"]/)[1];
  let sectionArr = segment.split("/");
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
      return file.path.split("/")[0] === subdir && file.path.split(".")[0] !== file.path;
    } else if (subdir === "") {
      return file.path.split(".")[0] !== file.path;
    }
  });
}

function parseLinks(filePath, contentArr, filePathSet) {
  let links = [];
  for (var i = 0; i < contentArr.length; i++) {
    if (
      (contentArr[i].match(/.*from\s*['"]\..*/)
      || contentArr[i].match(/.*require\s*\(['"]\..*/))
      && contentArr[i].includes("./")
      && !contentArr[i].slice(0, 6).includes("//")
      && !contentArr[i].slice(0, 6).includes("/*")
      && parseName(contentArr[i]) !== "") {
      links.push({
        "source": parsePath(filePath, contentArr[i], filePathSet),
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
  const names = graph.nodes.map(node => node.id);
  
  graph.links.forEach(link => {
    if (names.includes(link.source) && names.includes(link.target)) {
      newGraph.links.push(link);
    }
  });
  
  return newGraph;
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
