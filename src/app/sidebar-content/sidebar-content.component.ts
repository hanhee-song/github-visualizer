import { Component, OnInit } from '@angular/core';
import { SidebarContentService } from '../sidebar-content.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {
  content = ""
  
  constructor(
    private sidebarContentService: SidebarContentService
  ) {
    this.sidebarContentService.contentChange.subscribe(value => this.content = value);
  }

  ngOnInit() {
  }

}
