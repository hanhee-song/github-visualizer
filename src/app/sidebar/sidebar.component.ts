import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user;
  @Input() repo;
  @Input() subdir;
  @Input() url;
  
  constructor() { }

  ngOnInit() {
  }
  
  handleChange(e) {
    
  }
  
  handleUrlChange(e) {
    
  }

}



