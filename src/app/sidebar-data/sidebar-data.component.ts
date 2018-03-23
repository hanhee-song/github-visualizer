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

  constructor() { }

  ngOnInit() {
  }
}
