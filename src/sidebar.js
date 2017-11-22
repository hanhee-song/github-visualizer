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
