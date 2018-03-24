import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarContentService {
  content = ""

  constructor() { }

  setContent(str) {
    this.content = str
  }
  
  getContent() {
    return of(this.content)
  }
}
