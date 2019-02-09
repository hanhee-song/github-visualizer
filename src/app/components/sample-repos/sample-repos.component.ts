import { Params } from './../../models/models';
import { LogService } from './../../logger/log.service';
import { GitApiService } from '../../services/git-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogWrapper } from '../../logger/log-wrapper';

@Component({
  selector: 'app-sample-repos',
  templateUrl: './sample-repos.component.html',
  styleUrls: ['./sample-repos.component.css']
})
export class SampleReposComponent extends LogWrapper implements OnInit, OnDestroy {
  public examples: { [name: string]: Params } = {
    express: {
      user: "expressjs",
      repo: "express",
      subdir: "lib",
    },
    redux: {
      user: "reactjs",
      repo: "redux",
      subdir: "src",
    },
    react: {
      user: "facebook",
      repo: "react",
      subdir: "scripts",
    },
  };
  
  constructor(
    protected logService: LogService,
    private gitApiService: GitApiService
  ) {
    super(logService);
  }

  ngOnInit() {
    const initialRepo = {
      user: "hanhee-song",
      repo: "github-visualizer",
      subdir: "src/app",
    };
    setTimeout(() => {
      this.gitApiService.handleSubmit(initialRepo);
    }, 10);
  }
  
  ngOnDestroy() { }
  
  public handleSubmit(repo: string): void {
    this.gitApiService.handleSubmit(this.examples[repo]);
  }

}
