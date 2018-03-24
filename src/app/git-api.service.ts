import { SidebarContentService } from './sidebar-content.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { zip } from 'rxjs/observable/zip';

import { decode } from 'base-64';


@Injectable()
export class GitApiService {
  user: String;
  repo: String;
  subdir: String;
  
  _ = {
    sha: "",
    files: [],
    fetched: 0,
    parsed: 0,
    unparsed: 0,
    rootDirs: [],
    filePathSet: new Set(),
  }
  
  graphJSON = {
    nodes: [],
    links: [],
  }

  constructor(
    private http: HttpClient,
    private sidebarContentService: SidebarContentService
  ) { }
  
  handleSubmit(params) {
    this._clearVars()
    // Order of events
    // this._setParams
    // this._getRepo
    // this._processRepoResponse
    // this._getSha
    // this._processShaResponse
    // this._getFile
    this._setParams(params)
    return this._getRepo().subscribe(
      response => this._processRepoResponse(response),
      error => this.sidebarContentService.setContent(this._englishifyError(error))
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
  
  _processRepoResponse(response) {
    this._.sha = response[0].sha
    return this._getSha().subscribe(
      response => this._processShaResponse(response),
      error => this.sidebarContentService.setContent(this._englishifyError(error))
    )
  }
  
  _getSha() {
    return this.http.get(`https://api.github.com/repos/${this.user}/${this.repo}/git/trees/${this._.sha}?recursive=1`, {
      headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' }
    })
  }
  
  _processShaResponse(response) {
    this._.files = this._parseTree(response)
    if (this._.files.length > 200) {
      // raise error or something, or maybe you don't even need to raise an error
    }
    this._.rootDirs = this._parseRootDirs()
    this._.parsed = 0;
    this._.fetched = 0;
    this._.unparsed = 0;
    const observables = []
    for (let i = 0; i < this._.files.length; i++) {
      const file = this._.files[i];
      observables.push(this._getFile(file.url).pipe(
        tap(res => this._processFile(file.path, res)),
        catchError(err => this._handleFileError())
      ))
    }
    zip(...observables).subscribe(
      _ => {
        console.log(this.graphJSON)
      }
    )
  }
  
  _getFile(url) {
    return this.http.get(
      url,
      {
        headers: {
          'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==',
        }
      }
    )
  }
  
  _processFile(filePath, res) {
    const content = decode(res.content)
    this._.fetched++
    const contentArr = content.split(/\r?\n/);
    const fileName = this._parseName(filePath);
    this._addNode(filePath, contentArr.length, content)
    this._addLinks(filePath, contentArr)
  }
  
  _handleFileError() {
    this._.unparsed++
    return of(null)
  }
  
  _englishifyError(error) {
    if (error.status === 404) {
      return "404: Sorry, we couldn't find that repo!"
    } else {
      console.log(error)
      return "Sorry, we couldn't process the repo for an unknown reason.\nPlease check the console logs."
    }
  }
  
  // ================================================================
  
  _parseTree(response) {
    return response.tree.filter(file => {
      if (this._forbiddenFile(file.path)) {
        return false;
      }
      if (this.subdir) {
        const splitSubdir = this.subdir.split("/");
        const splitPath = file.path.split("/");
        for (let i = 0; i < splitSubdir.length; i++) {
          if (splitSubdir[i] !== splitPath[i]) {
            return false;
          }
        }
      }
      return true;
    });
  }
  
  _parseRootDirs() {
    let rootDirs = new Set();
    this._.files.forEach(file => {
      rootDirs.add(this._parseRoot(file.path));
    });
    return Array.from(rootDirs);
  }
  
  _parseRoot(path) {
    let pathArr = path.split("/");
    let subArr = this.subdir.split("/");
    if (subArr[subArr.length - 1] === pathArr[subArr.length - 1]) {
      return pathArr[subArr.length] ? pathArr[subArr.length] : pathArr[subArr.length - 1];
    } else {
      return pathArr[0];
    }
  }
  
  _forbiddenFile(path) {
    const parsedName = this._parseName(path);
    const ext = this._extension(path);
    return parsedName.match(/((bundle).*\.(js))/)
      || parsedName.match(/((webpack).*\.(config))/)
      || (ext !== "js"
        && ext !== "jsx")
      || path === "js" || path === "jsx"; // will otherwise break when folders are named js
  }
  
  _extension(path) {
    const splitPath = path.split(".");
    return splitPath[splitPath.length - 1];
  }
  
  _parseName(path) {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
  }
  
  _parseLinks(filePath, contentArr) {
    let links = [];
    for (let i = 0; i < contentArr.length; i++) {
      const line = contentArr[i];
      // Match 'from' or 'require' statements with './'
      const regex = line.match(/((from)|(require\s*\())\s*['"]([^'"]*\.\/[^'"]*)['"]/);
      if (regex && !line.match(/^.{0,7}\/[\*\/]/)) {
        links.push({
          "source": this._parsePath(filePath, regex[regex.length - 1]),
          "target": filePath
        });
      }
    }
    return links;
  }
  
  _parsePath(filePath, parsedImport) {
    let sectionArr = parsedImport.split("/");
    let pathArr = filePath.split("/");
    pathArr.pop();
    let newPath;
    sectionArr.forEach(section => {
      if (section === '..') {
        pathArr.pop();
      } else if (section !== ".") {
        pathArr.push(section);
      }
    });

    const combinedPath = pathArr.join("/");
    if (this._.filePathSet.has(combinedPath)) {
      return combinedPath;
    } else if (this._.filePathSet.has(combinedPath + ".jsx")) {
      return combinedPath + ".jsx";
    } else {
      return combinedPath + ".js";
    }
  }
  
  _addNode(filePath, length, content) {
    const name = this._parseName(filePath);
    let node = {
      id: filePath,
      name,
      extension: this._extension(filePath),
      loc: length,
      group: this._.rootDirs.indexOf(this._parseRoot(filePath)),
      content,
    };
    this.graphJSON.nodes.push(node);
  }
  
  _addLinks(filePath, contentArr) {
    const links = this._parseLinks(filePath, contentArr);
    links.forEach(link => {
      this.graphJSON.links.push(link)
    })
  }
  
  // ==================================
  
  _clearVars() {
    this._ = {
      sha: "",
      files: [],
      fetched: 0,
      parsed: 0,
      unparsed: 0,
      rootDirs: [],
      filePathSet: new Set(),
    }

    this.graphJSON = {
      nodes: [],
      links: [],
    }
  }
}
