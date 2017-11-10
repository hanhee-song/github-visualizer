
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
debugger;
debugger;
function fileParser(user, repo, subtree, key="") {
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
        makeRequest("GET", file.url, "", "accept", "application/vnd.github.VERSION.raw")
          .then(
            response => {
              let content = response.responseText;
              
              const fileName = parseName(file.path);
              let links = parseLinks(fileName, content);
              let node = {
                id: fileName,
                loc: content.split(/\r?\n/).length,
                group: rootDirs.indexOf(parseRoot(file.path, "frontend"))
              };
              graphJSON.nodes.push(node);
              graphJSON.links = graphJSON.links.concat(links);
              counter ++;
              if (counter === files.length) {
                debugger;
              }
            }
          );
      });
      // iterate over each file
      // send a GET request to the blob with "setHeader" as true
      // on completion of each promise, parse out internals
      // use response.responseText.split(/\r?\n/) to split into lines
      console.log(files);
      debugger;
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

function parseName(path) {
  return path.split("/")[path.split("/").length - 1].split(".")[0]
    .split("'")[0];
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
function parseLinks(fileName, content) {
  let contentArr = content.split(/\r?\n/);
  let links = [];
  for (var i = 0; i < contentArr.length; i++) {
    if (contentArr[i].includes("from") && contentArr[i].includes("./")) {
      links.push({
        "source": parseName(contentArr[i]),
        "target": fileName
      });
    }
  }
  return links;
}


//
// function parseResponse () {
//
// }

// repo.getTree();

// repo.getContents("", "", true, (...args) => {
// });

module.exports = fileParser;
