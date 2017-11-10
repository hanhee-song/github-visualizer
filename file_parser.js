const Github = require('github-api');
// import Github from 'github-api'

const gh = new Github();




function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
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

debugger;
debugger;
// let sha;
const repo = gh.getRepo("hanhee-song", "slic");
// repo.getSha("", "", (err, result, request) => {
//   sha = result[0].sha;
// });
debugger;
makeRequest("GET", `https://api.github.com/repos/hanhee-song/slic/commits`)
  .then(
    response => {
      debugger;
      return JSON.parse(response.responseText)[0].sha;
      
    }
  ).then(
    sha => {
      return makeRequest("GET", `https://api.github.com/repos/hanhee-song/slic/git/trees/${sha}?recursive=1`);
    }
  ).then(
    response => {
      debugger;
      repo.getContents();
    }
  );

function parseResponse () {
  
}

// debugger;
// repo.getTree();

// repo.getContents("", "", true, (...args) => {
//   debugger;
// });

module.exports = "fileParser";