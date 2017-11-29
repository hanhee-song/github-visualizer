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
