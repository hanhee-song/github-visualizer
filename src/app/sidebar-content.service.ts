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
  
  setData(data) {
    this.dataChange.next(Object.assign(this.data, data))
  }
}
