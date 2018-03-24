import { SidebarContentService } from './../sidebar-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-data',
  templateUrl: './sidebar-data.component.html',
  styleUrls: ['./sidebar-data.component.css']
})
export class SidebarDataComponent implements OnInit {
  data = {
    user: "",
    repo: "",
    subdir: "",
    totalLines: "",
    totalFiles: "",
    currentFile: "",
    currentLoc: "",
  }

  constructor(
    private sidebarContentService: SidebarContentService
  ) {
    this.sidebarContentService.dataChange.subscribe(value => this.data = value)
  }

  ngOnInit() {
  }
}
