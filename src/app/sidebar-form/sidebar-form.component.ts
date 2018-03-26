import { SidebarContentService } from './../sidebar-content.service';
import { GitApiService } from './../git-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-form',
  templateUrl: './sidebar-form.component.html',
  styleUrls: ['./sidebar-form.component.css']
})
export class SidebarFormComponent implements OnInit {
  @Input() params = {
    user: "",
    repo: "",
    subdir: "",
    url: "",
  }
  
  constructor(
    private gitApiService: GitApiService,
    private sidebarContentService: SidebarContentService
  ) { }

  ngOnInit() {
    this.gitApiService.paramsChange.subscribe(params => {
      this.params = Object.assign(this.params, params)
      this.makeUrl()
    })
  }

  handleChange() {
    this.makeUrl()
  }

  handleUrlChange() {
    this.parseUrl()
  }

  handleSubmit() {
    // TODO: error handling for empty fields
    if (!this.params.user || !this.params.repo) {
      this.sidebarContentService.setContent("Please enter both a username and a repo.")
    } else {
      this.gitApiService.handleSubmit(this.params)
    }
  }

  makeUrl() {
    let url = `https://github.com/${this.params.user}`;
    if (this.params.repo) {
      url += '/' + this.params.repo;
    }
    if (this.params.subdir) {
      url += '/tree/master/' + this.params.subdir;
    }
    this.params.url = url;
  }

  parseUrl() {
    let urlTag = this.params.url.match(/github\.com\/(.*)/);
    if (urlTag) {
      const urlTagArr = urlTag[1].split("/");
      this.params.user = urlTagArr[0] ? urlTagArr[0] : "";
      this.params.repo = urlTagArr[1] ? urlTagArr[1] : "";
      if (urlTagArr[2] === "tree" && urlTagArr[3] === "master"
        && urlTagArr[4]) {
        this.params.subdir = urlTagArr.slice(4).join("/");
      } else {
        this.params.subdir = "";
      }
    }
  }
}
