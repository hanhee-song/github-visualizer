import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarData } from '../models/models';

@Injectable()
export class SidebarContentService {
  private content = "";
  private data = {
    totalLines: 0,
    totalFiles: 0,
    currentFile: "",
    currentLoc: "",
  }
  public contentChange: Subject<string> = new Subject<string>()
  public dataChange = new Subject<SidebarData>();

  constructor() {
    this.contentChange.subscribe(val => this.content = val);
    this.dataChange.subscribe(data => this.data = Object.assign(this.data, data));
  }

  public setContent(str: string): void {
    this.contentChange.next(str);
  }
  
  public setHelpMessage(): void {
    this.contentChange.next(`INSTRUCTIONS:

* Click and drag to move nodes around.

* Click on a node to see its contents.

* Click on the same node or the background to return
to the main view, or click on a different node to
select a new node.

* Search a file using the search box: to find a file
named "message_form_container.jsx", it's enough to
search for "mes form cont".

* Press pause to pause the simulation.`);
  }
  
  public setData(data: SidebarData): void {
    this.dataChange.next(Object.assign(this.data, data));
  }
}
