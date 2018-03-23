import { GitApiService } from './../git-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-form',
  templateUrl: './sidebar-form.component.html',
  styleUrls: ['./sidebar-form.component.css']
})
export class SidebarFormComponent implements OnInit {
  @Input() user = "hanhee-song";
  @Input() repo = "github-visualizer";
  @Input() subdir = "";
  @Input() url = "";
  
  constructor(
    private gitApiService: GitApiService
  ) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.makeUrl()
  }

  handleUrlChange(e) {
    this.parseUrl()
  }

  handleSubmit() {
    // TODO: error handling for empty fields
    const params = {
      user: this.user,
      repo: this.repo,
      subdir: this.subdir,
    }
    this.gitApiService.handleSubmit(params)
  }

  makeUrl() {
    let url = `https://github.com/${this.user}`;
    if (this.repo) {
      url += '/' + this.repo;
    }
    if (this.subdir) {
      url += '/tree/master/' + this.subdir;
    }
    this.url = url;
  }

  parseUrl() {
    let urlTag = this.url.match(/github\.com\/(.*)/);
    if (urlTag) {
      const urlTagArr = urlTag[1].split("/");
      this.user = urlTagArr[0] ? urlTagArr[0] : "";
      this.repo = urlTagArr[1] ? urlTagArr[1] : "";
      if (urlTagArr[2] === "tree" && urlTagArr[3] === "master"
        && urlTagArr[4]) {
        this.subdir = urlTagArr.slice(4).join("/");
      } else {
        this.subdir = "";
      }
    }
  }
}
