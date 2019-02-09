import { Subject, Subscription } from 'rxjs';
import { SidebarContentService } from './sidebar-content.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, delay } from 'rxjs/operators'
import { zip } from 'rxjs';
import { Params } from '../models/models';

import { decode } from 'base-64';
import { LogWrapper } from '../logger/log-wrapper';
import { LogService } from '../logger/log.service';

interface ShaResponse {
  tree: {
    path: string,
  }[]
}

const VALID_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];

@Injectable()
export class GitApiService implements OnDestroy {
  private paramsChange = new Subject<any>();
  private user: string = "";
  private repo: string = "";
  private subdir: string = "";
  
  private loading = false
  
  private _ = {
    sha: "",
    files: [],
    fetched: 0,
    parsed: 0,
    unparsed: 0,
    rootDirs: [],
    filePathSet: new Set(),
  };
  
  private graphChange = new Subject();
  private graphJSON = {
    nodes: [],
    links: [],
  };

  constructor(
    protected logService: LogService,
    private http: HttpClient,
    private sidebarContentService: SidebarContentService
  ) {
    this.graphChange.subscribe()
    this.paramsChange.subscribe(
      params => {
        this.user = params.user
        this.repo = params.repo
        if (params.subdir) {
          this.subdir = params.subdir
        }
      }
    )
  }
  
  public ngOnDestroy() {}
  
  public getParamsChange(): Subject<any> {
    return this.paramsChange;
  }
  
  public getGraphChange(): Subject<any> {
    return this.graphChange;
  }
  
  public handleSubmit(params: Params): Subscription {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._clearVars();
    this.sidebarContentService.setContent("Fetching repo from Github...");
    this.paramsChange.next(params);
    // Order of events
    // this._setParams
    // this._getRepo
    // this._processRepoResponse
    // this._getSha
    // this._processShaResponse
    // this._getFile
    this._setParams(params);
    return this._getRepo().subscribe(
      (response: HttpResponse<any>) => this._processRepoResponse(response),
      error => {
        this.sidebarContentService.setContent(this._englishifyError(error));
        this.loading = false;
      }
    )
  }
  
  private _setParams(params: Params): void {
    this.user = params.user;
    this.repo = params.repo;
    this.subdir = params.subdir;
  }
  
  private _getRepo(): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${this.user}/${this.repo}/commits`, {
      headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' },
    });
  }
  
  private _processRepoResponse(response: HttpResponse<any>): void {
    this._.sha = response[0].sha;
    this._getSha().subscribe(
      (response: ShaResponse) => this._processShaResponse(response),
      error => {
        this.sidebarContentService.setContent(this._englishifyError(error));
        this.loading = false;
      }
    )
  }
  
  private _getSha(): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${this.user}/${this.repo}/git/trees/${this._.sha}?recursive=1`, {
      headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' }
    })
  }
  
  private _processShaResponse(response: ShaResponse): void {
    this._.files = this._parseTree(response);
    if (this._.files.length > 200) {
      // raise error or something, or maybe you don't even need to raise an error
      this.sidebarContentService.setContent(`Repo too large: ${this._.files.length} files found.

There is a limit of 200 files to avoid flooding the Github servers.

Maybe specify a subdirectory?`);
      return
    }
    this._.rootDirs = this._parseRootDirs();
    this._.filePathSet = new Set(Object.values(this._.files).map(file => file.path ));
    
    this._.parsed = 0;
    this._.fetched = 0;
    this._.unparsed = 0;
    this._setMessage();
    const observables = [];
    for (let i = 0; i < this._.files.length; i++) {
      const file = this._.files[i];
      observables.push(this._getFile(file.url).pipe(
        tap(res => this._processFile(file.path, res)),
        catchError(err => this._handleFileError())
      ));
    }
    zip(...observables)
      .pipe(delay(1500))
      .subscribe(
      _ => {
        this.loading = false
        this._sanitizeGraph()
        this.graphChange.next(this.graphJSON)
        let totalLines = 0;
        this.graphJSON.nodes.forEach(node => {
          totalLines += node.loc;
        });
        this.sidebarContentService.setData({
          totalLines,
          totalFiles: this.graphJSON.nodes.length,
        });
        this.sidebarContentService.setHelpMessage();
      }
    )
  }
  
  private _getFile(url: string): Observable<any> {
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
    this._setMessage()
    const contentArr = content.split(/\r?\n/);
    const fileName = this._parseName(filePath);
    this._addNode(filePath, contentArr.length, content)
    this._addLinks(filePath, contentArr)
    this._.parsed++
    this._setMessage()
  }
  
  _handleFileError() {
    this._.unparsed++
    this._setMessage()
    return of(null)
  }
  
  private _englishifyError(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return "404: Sorry, we couldn't find that repo!"
    } else {
      console.log(error)
      return "Sorry, we couldn't process the repo for an unknown reason.\nPlease check the console logs."
    }
  }
  
  _setMessage() {
    let finishedMessage = "";
    if (this._.files.length === this._.parsed + this._.unparsed) {
      finishedMessage = "Repository loaded!";
    }
    this.sidebarContentService.setContent(`Repo found. Fetching and parsing files...
    
   Fetched files: ${this._.fetched} / ${this._.files.length}
    Parsed files: ${this._.parsed} / ${this._.files.length}
Unparsable files: ${this._.unparsed}

${finishedMessage}`);
  }
  
  // ================================================================
  
  private _parseTree(response: ShaResponse): { path: string }[] {
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
  
  private _parseRootDirs(): string[] {
    let rootDirs = new Set();
    this._.files.forEach(file => {
      rootDirs.add(this._parseRoot(file.path));
    });
    return Array.from(rootDirs);
  }
  
  private _parseRoot(path: string): string {
    let pathArr = path.split("/");
    let subArr = this.subdir.split("/");
    if (subArr[subArr.length - 1] === pathArr[subArr.length - 1]) {
      return pathArr[subArr.length] ? pathArr[subArr.length] : pathArr[subArr.length - 1];
    } else {
      return pathArr[0];
    }
  }
  
  private _forbiddenFile(path: string): boolean {
    const parsedName = this._parseName(path);
    const ext = this._extension(path);
    return !!parsedName.match(/((bundle).*\.(js))/)
      || !!parsedName.match(/((webpack).*\.(config))/)
      || !VALID_EXTENSIONS.includes(ext)
      || VALID_EXTENSIONS.includes(path); // will otherwise break when folders are named js
  }
  
  private _extension(path: string): string {
    const splitPath = path.split(".");
    return splitPath[splitPath.length - 1];
  }
  
  private _parseName(path: string): string {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
  }
  
  private _parseLinks(filePath: string, contentArr: string[]): string[] {
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
  
  private _parsePath(filePath: string, parsedImport: string): string {
    let sectionArr = parsedImport.split("/");
    let pathArr = filePath.split("/");
    pathArr.pop();
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
    } else {
      for (let i = 0; i < VALID_EXTENSIONS.length; i++) {
        const ext = VALID_EXTENSIONS[i];
        if (this._.filePathSet.has(combinedPath + ext)) {
          return combinedPath + ext;
        }
      }
    }
  }
  
  private _addNode(filePath: string, length: number, content: string) {
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
  
  private _addLinks(filePath: string, contentArr: string[]) {
    const links = this._parseLinks(filePath, contentArr);
    links.forEach(link => {
      this.graphJSON.links.push(link)
    })
  }
  
  private _sanitizeGraph(): void {
    let newGraph = {
      "links": [],
      "nodes": this.graphJSON.nodes
    };
    const names = new Set(this.graphJSON.nodes.map(node => node.id));
    
    this.graphJSON.links.forEach(link => {
      if (names.has(link.source) && names.has(link.target)) {
        newGraph.links.push(link);
      }
    });
    
    this.graphJSON = newGraph;
  }
  
  // ==================================
  
  private _clearVars(): void {
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
