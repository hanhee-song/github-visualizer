import { GitApiService } from '../../services/git-api.service';
import { SidebarContentService } from '../../services/sidebar-content.service';
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
    private sidebarContentService: SidebarContentService,
    private gitApiService: GitApiService
  ) {
    this.sidebarContentService.dataChange.subscribe(value => this.data = Object.assign(this.data, value))
    this.gitApiService.getParamsChange().subscribe(value => this.data = Object.assign(this.data, value))
  }

  ngOnInit() {
  }
}
