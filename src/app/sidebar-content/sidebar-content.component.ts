import { Component, OnInit } from '@angular/core';
import { SidebarContentService } from '../sidebar-content.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {
  constructor(
    public sidebarContentService: SidebarContentService
  ) { }

  ngOnInit() {
  }

}
