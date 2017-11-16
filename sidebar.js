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
    const fileNameText = document.createTextNode(`Current directory: ${d.id}`);
    const fileLoc = document.createTextNode(`    Current lines: ${d.loc}`);
    textArr = textArr.concat([fileNameText, fileLoc]);
  }
  
  textArr.forEach((textNode) => {
    header.append(textNode);
    header.append(document.createTextNode("\n"));
  });
}

const MESSAGE = `Instructions:

Click and drag to move nodes around.

Double-click a node to see its contents.

Double-click on the same node to return to the main view,
or double-click on a different node to select a new node.
`;

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
