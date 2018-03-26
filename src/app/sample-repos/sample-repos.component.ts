import { GitApiService } from './../git-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-repos',
  templateUrl: './sample-repos.component.html',
  styleUrls: ['./sample-repos.component.css']
})
export class SampleReposComponent implements OnInit {
  examples = {
    "express": {
      "user": "expressjs",
      "repo": "express",
      "subdir": "lib",
    },
    "redux": {
      "user": "reactjs",
      "repo": "redux",
      "subdir": "src",
    },
    "react": {
      "user": "facebook",
      "repo": "react",
      "subdir": "scripts",
    },
    "slic": {
      "user": "hanhee-song",
      "repo": "slic",
      "subdir": "frontend",
    },
  };
  
  constructor(
    private gitApiService: GitApiService
  ) { }

  ngOnInit() {
    const initialRepo = {
      user: "hanhee-song",
      repo: "github-visualizer",
      subdir: "src/app",
    }
    setTimeout(() => {
      this.gitApiService.handleSubmit(initialRepo)
    }, 10);
  }
  
  handleSubmit(repo) {
    this.gitApiService.handleSubmit(this.examples[repo])
  }

}
