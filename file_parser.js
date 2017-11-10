const Github = require('github-api');
// import Github from 'github-api'

const gh = new Github();

// const hanhee = gh.getUser('hanhee-song');

const repo = gh.getRepo("hanhee-song", "slic");

let sha;
function getSHA() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.status === 200 && this.readyState === 4) {
      sha = JSON.parse(request.responseText)[0].sha;
      debugger;
    }
  };
  
  request.open("GET", `https://api.github.com/repos/hanhee-song/slic/commits`, true);
  request.send();
}
getSHA();

// debugger;
// repo.getTree();

// repo.getContents("", "", true, (...args) => {
//   debugger;
// });

module.exports = "fileParser";