import { GitApiService } from './../git-api.service';
import { Component, OnInit } from '@angular/core';
import { drawGraph } from './draw-graph';

@Component({
  selector: 'app-d3-container',
  templateUrl: './d3-container.component.html',
  styleUrls: ['./d3-container.component.css']
})
export class D3ContainerComponent implements OnInit {

  constructor(
    private gitApiService: GitApiService
  ) {
    this.gitApiService.graphChange.subscribe(graph => {
      console.log(graph)
      drawGraph(graph, "", "", "")
    })
  }

  ngOnInit() {
  }

}
