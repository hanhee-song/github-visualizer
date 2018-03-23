import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable()
export class GitApiService {
  user;
  repo;
  subdir;

  constructor(
    private http: HttpClient
  ) { }
  
  handleSubmit(params) {
    this._setParams(params)
    this._getRepo().subscribe(
      response => console.log(response)
    )
  }
  
  _setParams(params) {
    this.user = params.user
    this.repo = params.repo
    this.subdir = params.subdir
  }
  
  _getRepo() {
    return this.http.get(`https://api.github.com/repos/${this.user}/${this.repo}/commits`, {
      headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' }
    })
  }
}
