# Github Filetree Visualizer

![](https://thumbs.gfycat.com/MeatyRecklessButterfly-size_restricted.gif)

[Live Site](https://hanhee-song.github.io/github-visualizer/)

The Github Filetree Visualizer combines the D3 library with Github's API to create powerful visualizations of JavaScript-based repositories.

### Features

The visualizer will parse out the contents of any given repository, sift through all files with a ```.js``` or ```.jsx``` extension, and calculate the interdependencies based on the contents of the files.

Users can input either the Github URL or the user, repo, and an optional subdirectory. The visualizer will retrieve and display the files in a graph.

Nodes denote files with a .js or .jsx extension. The size of the node corresponds to the size of the file. Nodes are colored by the subdirectory they are in.

Users can click on a node to highlight its links and display its contents. To remove highlighting, users can click on the same node or on the background. Users can also click and drag nodes around.

The visualizer is compatible with various major repositories, including Redux, Express, and React.

![](https://thumbs.gfycat.com/DeliriousFarflungAquaticleech-size_restricted.gif)

## How it works

The visualizer sends XHR requests via the Github API - one to retrieve the SHA of the most recent commit, one to retrieve the file tree, and a series of requests to retrieve the contents of every ```.js``` or ```.jsx``` file. It stores each file as a node and examines file dependencies to construct links between each file. Any line with an ```import``` or ```require``` statement is parsed into a link between the two files. The resulting JSON is then rendered in D3.

#### Notes

* The visualizer ignores any file named ```bundle```
* References to node modules or files outside of the specified subdirectory are ignored
* Colors are based on the subdirectory immediately following the specified directory. Providing a subdirectory (if applicable) will result in more colorful graphs
* The subdirectory field takes in only one folder. Attempting to nest folders will result in an error
