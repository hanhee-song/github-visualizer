import { LogWrapper } from './../../logger/log-wrapper';
import { SidebarContentService } from '../../services/sidebar-content.service';
import { GitApiService } from '../../services/git-api.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LogService } from '../../logger/log.service';

@Component({
  selector: 'app-sidebar-form',
  templateUrl: './sidebar-form.component.html',
  styleUrls: ['./sidebar-form.component.css']
})
export class SidebarFormComponent extends LogWrapper implements OnInit, OnDestroy {
  @Input() params = {
    user: "",
    repo: "",
    subdir: "",
    url: "",
  }
  
  constructor(
    protected logService: LogService,
    private gitApiService: GitApiService,
    private sidebarContentService: SidebarContentService
  ) {
    super(logService);
  }

  ngOnInit() {
    this.gitApiService.getParamsChange().subscribe(params => {
      this.params = Object.assign(this.params, params)
      this.makeUrl()
    })
  }
  
  ngOnDestroy() { }

  public handleChange(): void {
    this.makeUrl()
  }

  public handleUrlChange(): void {
    this.parseUrl()
  }

  public handleSubmit(): void {
    if (!this.params.user || !this.params.repo) {
      this.sidebarContentService.setContent("Please enter both a username and a repo.")
    } else {
      this.gitApiService.handleSubmit(this.params)
    }
  }

  private makeUrl(): void {
    let url = `https://github.com/${this.params.user}`;
    if (this.params.repo) {
      url += '/' + this.params.repo;
    }
    if (this.params.subdir) {
      url += '/tree/master/' + this.params.subdir;
    }
    this.params.url = url;
  }

  private parseUrl(): void {
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
