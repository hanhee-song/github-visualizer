import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarContentService {
  content = ""
  contentChange: Subject<string> = new Subject<string>()

  constructor() {
    this.contentChange.subscribe(val => this.content = val)
  }

  setContent(str) {
    this.contentChange.next(str)
  }
}
