import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarContentService {
  content = ""
  data = {
    user: "",
    repo: "",
    subdir: "",
    totalLines: "",
    totalFiles: "",
    currentFile: "",
    currentLoc: "",
  }
  contentChange: Subject<string> = new Subject<string>()
  dataChange = new Subject<any>()

  constructor() {
    this.contentChange.subscribe(val => this.content = val)
    this.dataChange.subscribe(data => this.data = data)
  }

  setContent(str) {
    this.contentChange.next(str)
  }
  
  setHelpMessage() {
    this.contentChange.next(`INSTRUCTIONS:

* Click and drag to move nodes around.

* Click on a node to see its contents.

* Click on the same node or the background to return
to the main view, or click on a different node to
select a new node.

* Search a file using the search box: to find a file
named "message_form_container.jsx", it's enough to
search for "mes form cont".

* Press pause to pause the simulation.`)
  }
  
  setData(data) {
    this.dataChange.next(Object.assign(this.data, data))
  }
}
