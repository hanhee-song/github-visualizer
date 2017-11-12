# Github Filetree Visualizer

![example gif](https://thumbs.gfycat.com/ThirdThriftyKrill-max-14mb.gif)

[Live Site](https://hanhee-song.github.io/github-visualizer/)

The Github Filetree Visualizer combines the D3 library with Github's API to create powerful visualizations of JavaScript-based repositories.

### Features

The visualizer will parse out the contents of any given repository, sift through all files with a ```.js``` or ```.jsx``` extension, and calculate the interdependencies based on the contents of the files.

Users can input either the Github URL or the user, repo, and an optional subdirectory. The visualizer will retrieve and display the files in a graph.

A node represents a file. The side of the node corresponds with the number of lines of code in the file. An arrow from one node to another represents an interdependency.

Users can double-click a node to highlight its links and display its contents, or double-click the same node to remove highlighting. Users can also click and drag nodes around.

The visualizer is compatible with various major repositories.

#### Redux

<img src="https://github.com/hanhee-song/github-visualizer/blob/master/docs/image_1.png?raw=true" width="600px"/>

#### Express

<img src="https://github.com/hanhee-song/github-visualizer/blob/master/docs/image_2.png?raw=true" width="600px"/>

#### ...and even itself

<img src="https://github.com/hanhee-song/github-visualizer/blob/master/docs/image_3.png?raw=true" width="600px"/>

## How it works

The visualizer sends XHR requests via the Github API - one to retrieve the SHA of the most recent commit, one to retrieve the file tree, and a series of requests to retrieve the contents of every ```.js``` or ```.jsx``` file. It stores each file as a node and examines file dependencies to construct links between each file. Any line with an ```import``` or ```require``` statement is parsed into a link between the two files. The resulting JSON is then rendered in D3.

#### Notes

* The visualizer ignores any file named ```bundle```
* References to node modules or files outside of the specified subdirectory are ignored
* Colors are based on the subdirectory immediately following the specified directory. Providing a subdirectory (if applicable) will result in more colorful graphs
* The subdirectory field takes in only one folder. Attempting to nest folders will result in an error
