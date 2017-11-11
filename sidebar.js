function generateHeader(graph, user, repo, subdir) {
  const header = document.querySelector(".sidebar-header");
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }
  
  let totalLines = 0;
  graph.nodes.forEach(node => {
    totalLines += node.loc;
  });
  
  const linkText = document.createTextNode(`https://api.github.com/repos/${user}/${repo}`);
  const userText = document.createTextNode(`       Current user: ${user}`);
  const repoText = document.createTextNode(`       Current repo: ${repo}`);
  const subdirText = document.createTextNode(`     Current subdir: ${subdir}`);
  const linesText = document.createTextNode(`Total lines of code: ${totalLines}`);
  const lineBreak = document.createElement("br");
  
  const textArr = [linkText, userText, repoText, subdirText, linesText];
  textArr.forEach((textNode) => {
    header.append(textNode);
    header.append(document.createTextNode("\n"));
  });
}

function setContentMessage(content) {
  const fileBox = document.querySelector(".file-content");
  while (fileBox.firstChild) {
    fileBox.removeChild(fileBox.firstChild);
  }
  const text = content || "Doubleclick a node to see its contents!";
  let textNode = document.createTextNode(text);
  fileBox.appendChild(textNode);
}
module.exports = {
  generateHeader,
  setContentMessage
};
