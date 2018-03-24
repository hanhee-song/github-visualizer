import { GitApiService } from './../git-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d3-container',
  templateUrl: './d3-container.component.html',
  styleUrls: ['./d3-container.component.css']
})
export class D3ContainerComponent implements OnInit {

  constructor(
    private gitApiService: GitApiService
  ) { }

  ngOnInit() {
  }

}
