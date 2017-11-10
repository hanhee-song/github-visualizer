const Github = require('github-api');
// import Github from 'github-api'

const gh = new Github();


const repo = gh.getRepo("hanhee-song", "slic");


function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
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

let sha;
makeRequest("GET", `https://api.github.com/repos/hanhee-song/slic/commits`)
  .then(
    responseText => {
      sha = JSON.parse(responseText)[0].sha;
      console.log(JSON.parse(responseText)[0].sha);
    }
  );

// debugger;
// repo.getTree();

// repo.getContents("", "", true, (...args) => {
//   debugger;
// });

module.exports = "fileParser";