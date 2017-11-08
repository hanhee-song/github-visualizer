# Project File Interdependency Visualizer

### MVP

The project will give a visual and interactive web of file interdependencies and imports of a file tree, namely the Redux/React files of my fullstack project. Asides from basic click-and-drag interactions, files will display their import statements (and maybe even have their lines highlighted) on mouseover.

The project will also include a production README, and maybe a classic atom-filetree representation of the files at hand to contrast the two.

### Technologies, libraries, APIs

The bulk of this project will be devoted to learning and implementing D3. In addition to the entry file, there will be one other script, ```graph.js```, and any necessary helper files.

### Wireframes

The app will be a single screen with the graph in the middle and links to my Github, LinkedIn, and profile on the bottom.

### Implementation Timeline

Day 1: basic setup, familiarize self with D3 and experiment with its API.

Day 2: Build a basic graph with sufficient styling.

Day 3: Get data showing! Manually parse necessary data and incorporate into graph.

Day 4: Build hover feature and other interactive features.

### Bonus Features

* Have the size of the node respond to the line count of the file
* Use Github API to analyze file contents and remove the need to manually import data
