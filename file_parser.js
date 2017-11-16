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
      const filePathArr = Object.values(files).map((file) => {
        return file.path;
      });
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
              let links = parseLinks(file.path, contentArr, filePathArr);
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
            console.log(graphJSON);
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
  return path.split("/")[path.split("/").length - 1];//.split(".")[0]
    //.split("'")[0].split("\"")[0];
}

function parseFullName(path) {
  return path.split("/");
}

function extension(path) {
  return path.split(".")[path.split(".").length - 1];
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

function parsePath(filePath, line, filePathArr) {
  let lineArr = line.split("'");
  if (lineArr.length === 1) {
    lineArr = line.split("\"");
  }
  let segment;
  lineArr.forEach(section => {
    if (section.includes("./")) segment = section;
  });
  
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
  
  if (filePathArr.includes(combinedPath)) {
    return combinedPath;
  } else if (filePathArr.includes(combinedPath + ".jsx")) {
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

function noExtension(filePath) {
  return filePath.split(".")[0];
}

function parseLinks(filePath, contentArr, filePathArr) {
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
        "source": parsePath(filePath, contentArr[i], filePathArr),
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

module.exports = fileParser;
