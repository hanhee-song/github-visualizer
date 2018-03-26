webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"title-wrapper\">\n  <div>Github</div>&nbsp;\n  <div>Filetree</div>&nbsp;\n  <div>Visualizer</div>\n  <!-- <div class=\"button-help\">\n    ?\n  </div> -->\n</div>\n\n<app-sample-repos></app-sample-repos>\n\n<div class=\"main\">\n  <app-sidebar></app-sidebar>\n  <app-d3-container></app-d3-container>\n</div>\n\n<div class=\"name\">\n  Hanhee Song\n</div>\n<div class=\"about-me\">\n  <a href=\"https://hanhee-song.com\" rel=\"noopener noreferrer\" target=\"_blank\">\n    <i class=\"fa fa-home\" aria-hidden=\"true\"></i>\n  </a>\n  <a href=\"https://github.com/hanhee-song/project-visualizer\" rel=\"noopener noreferrer\" target=\"_blank\">\n    <i class=\"fa fa-github\" aria-hidden=\"true\"></i>\n  </a>\n  <a href=\"https://www.linkedin.com/in/hanhee-song\" rel=\"noopener noreferrer\" target=\"_blank\">\n    <i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i>\n  </a>\n  <a href=\"mailto:song.hanhee@gmail.com\">\n    <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>&nbsp;\n    <div class=\"text\">song.hanhee@gmail.com</div>\n  </a>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sidebar_sidebar_component__ = __webpack_require__("./src/app/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sidebar_form_sidebar_form_component__ = __webpack_require__("./src/app/sidebar-form/sidebar-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sidebar_data_sidebar_data_component__ = __webpack_require__("./src/app/sidebar-data/sidebar-data.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sidebar_content_sidebar_content_component__ = __webpack_require__("./src/app/sidebar-content/sidebar-content.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__git_api_service__ = __webpack_require__("./src/app/git-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__d3_container_d3_container_component__ = __webpack_require__("./src/app/d3-container/d3-container.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sample_repos_sample_repos_component__ = __webpack_require__("./src/app/sample-repos/sample-repos.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__sidebar_sidebar_component__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__sidebar_form_sidebar_form_component__["a" /* SidebarFormComponent */],
                __WEBPACK_IMPORTED_MODULE_6__sidebar_data_sidebar_data_component__["a" /* SidebarDataComponent */],
                __WEBPACK_IMPORTED_MODULE_7__sidebar_content_sidebar_content_component__["a" /* SidebarContentComponent */],
                __WEBPACK_IMPORTED_MODULE_11__d3_container_d3_container_component__["a" /* D3ContainerComponent */],
                __WEBPACK_IMPORTED_MODULE_12__sample_repos_sample_repos_component__["a" /* SampleReposComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__git_api_service__["a" /* GitApiService */],
                __WEBPACK_IMPORTED_MODULE_10__sidebar_content_service__["a" /* SidebarContentService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/d3-container/d3-container.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/d3-container/d3-container.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"svg-container\">\n  <div class=\"top-options\">\n    <div class=\"top-options-search\">\n      <label class=\"search-label\">\n        <input id=\"search\"\n          class=\"input-text\"\n          [(ngModel)]=\"searchedId\"\n          (ngModelChange)=\"handleSearch()\"\n          type=\"text\"\n          placeholder=\"Search\"\n          name=\"searchedId\">\n        <span></span>\n      </label>\n      <div id=\"search-clear\"\n        (click)=\"handleClearSearch()\">\n        x\n      </div>\n    </div>\n\n    <div id=\"pause-button\"\n      (click)=\"handlePause()\">\n      <i class=\"fa toggle-pause-icon\"\n        [ngClass]=\"!paused ? 'fa-pause' : 'fa-play'\"\n        aria-hidden=\"true\"></i>\n    </div>\n  </div>\n  <svg class=\"svg-main\" width=\"500\" height=\"474\">\n  </svg>\n</div>\n"

/***/ }),

/***/ "./src/app/d3-container/d3-container.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3ContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_api_service__ = __webpack_require__("./src/app/git-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__("./node_modules/d3/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var D3ContainerComponent = /** @class */ (function () {
    function D3ContainerComponent(gitApiService, sidebarContentService) {
        var _this = this;
        this.gitApiService = gitApiService;
        this.sidebarContentService = sidebarContentService;
        this.highlightedId = "";
        this.hoveredId = "";
        this.clickedId = "";
        this.searchedId = "";
        this.paused = false;
        this.linkedById = {};
        this.gitApiService.graphChange.subscribe(function (graph) {
            _this.drawGraph(graph);
        });
    }
    D3ContainerComponent.prototype.ngOnInit = function () {
    };
    // D3 LIVES HERE =======================================
    // Todo: refactor this mess
    // There's a good deal of really messy code from back when this was
    // executed functional-style in a separate file
    D3ContainerComponent.prototype.drawGraph = function (graph) {
        var _this = this;
        this.graph = graph;
        var svg = __WEBPACK_IMPORTED_MODULE_3_d3__["g" /* select */]('.svg-main');
        svg.selectAll("g").remove();
        svg.selectAll("text").remove();
        this.width = Number(svg.attr("width"));
        this.height = Number(svg.attr("height"));
        svg.on("click", this.unhighlightNode.bind(this));
        this.simulation = __WEBPACK_IMPORTED_MODULE_3_d3__["f" /* forceSimulation */]()
            .force("link", __WEBPACK_IMPORTED_MODULE_3_d3__["d" /* forceLink */]()
            .distance(function (d) { return _this.distance(d); })
            .strength(1)
            .id(function (d) { return d.id; }))
            .force("charge", __WEBPACK_IMPORTED_MODULE_3_d3__["e" /* forceManyBody */](0))
            .force("collision", __WEBPACK_IMPORTED_MODULE_3_d3__["c" /* forceCollide */](10));
        // LINKS, NODES, AND TEXT =============================
        this.link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("marker-end", function (d) { return "url(#marker_" + d.id + ")"; })
            .attr("opacity", ".4");
        svg.append("svg:defs").selectAll("marker")
            .data(graph.links)
            .enter().append("svg:marker")
            .attr("id", function (d) { return "marker_" + d.id; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .attr("fill", "#ccc")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
        // Pre-compute radius to save processing time
        var graphNodes = [];
        for (var i = 0; i < graph.nodes.length; i++) {
            graphNodes.push(Object.assign({}, graph.nodes[i], { r: Math.sqrt(graph.nodes[i].loc * 2 + 25) }));
        }
        this.node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graphNodes)
            .enter()
            .append("circle")
            .attr("r", function (d) { return d.r; })
            .attr("fill", function (d) { return _this.color(d); })
            .call(__WEBPACK_IMPORTED_MODULE_3_d3__["a" /* drag */]()
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragged.bind(this))
            .on("end", this.dragended.bind(this)))
            .on("click", this.highlightNode.bind(this))
            .on("mouseover", this.hoverNode.bind(this))
            .on("mouseout", this.hoverNode.bind(this));
        this.text = svg.selectAll("text").filter(".label")
            .data(graphNodes)
            .enter()
            .append("text")
            .classed("label", true)
            .text(function (d) { return _this.abbreviate(d.name); });
        this.simulation.nodes(graphNodes)
            .on("tick", this.ticked.bind(this));
        this.simulation.force("link")
            .links(graph.links);
        // NEIGHBOR HELPER METHODS ===========================
        this.linkedById = {};
        for (var i = 0; i < graphNodes.length; i++) {
            this.linkedById[i + "," + i] = 1;
        }
        graph.links.forEach(function (d) {
            _this.linkedById[d.source.id + "," + d.target.id] = 1;
        });
    };
    // TICK FUNCTION ========================================
    D3ContainerComponent.prototype._boundedX = function (d) {
        return Math.max(d.r, Math.min(this.width - d.r - 2, d.x));
    };
    ;
    D3ContainerComponent.prototype._boundedY = function (d) {
        return Math.max(d.r, Math.min(this.height - d.r - 2, d.y));
    };
    ;
    D3ContainerComponent.prototype.ticked = function () {
        var _this = this;
        var circumferenceHash = {};
        this.link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) {
            circumferenceHash[d.source.id + d.target.id] = _this.getCircumferencePoint(d);
            return circumferenceHash[d.source.id + d.target.id][0];
        })
            .attr("y2", function (d) { return circumferenceHash[d.source.id + d.target.id][1]; });
        this.node
            .attr("cx", function (d) {
            d.x = _this._boundedX(d);
            return d.x;
        })
            .attr("cy", function (d) {
            d.y = _this._boundedY(d);
            return d.y;
        });
        this.text
            .attr("x", function (d) { return d.x + 1 + d.r; })
            .attr("y", function (d) { return d.y + 3; });
    };
    D3ContainerComponent.prototype.getCircumferencePoint = function (d) {
        var tRadius = d.target.r;
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var gamma = Math.atan2(dy, dx);
        var tx = d.target.x - (Math.cos(gamma) * tRadius);
        var ty = d.target.y - (Math.sin(gamma) * tRadius);
        return [tx, ty];
    };
    D3ContainerComponent.prototype.linkedIds = function (a, b) {
        return this.linkedById[a + "," + b];
    };
    D3ContainerComponent.prototype.adjacent = function (o, d) {
        var oId = o.id ? o.id : o;
        var dId = d.id ? d.id : d;
        return this.linkedIds(oId, dId) || this.linkedIds(dId, oId) || oId === dId;
    };
    // HOVER / HIGHLIGHT / CLICK EFFECTS ===================
    D3ContainerComponent.prototype.highlightNode = function (d) {
        __WEBPACK_IMPORTED_MODULE_3_d3__["b" /* event */].stopPropagation();
        if (!this.highlightedId || this.highlightedId !== d.id) {
            this.highlightedId = d.id;
            this.sidebarContentService.setContent(d.content);
            this.sidebarContentService.setData({
                currentFile: d.id,
                currentLoc: d.loc,
            });
        }
        else {
            this.sidebarContentService.setHelpMessage();
            this.sidebarContentService.setData({
                currentFile: "",
                currentLoc: "",
            });
            this.highlightedId = "";
        }
        this.generateOpacity();
        this.generateText();
    };
    D3ContainerComponent.prototype.unhighlightNode = function (d) {
        this.sidebarContentService.setHelpMessage();
        this.sidebarContentService.setData({
            currentFile: "",
            currentLoc: "",
        });
        this.highlightedId = "";
        this.generateOpacity();
        this.generateText();
    };
    D3ContainerComponent.prototype.hoverNode = function (d) {
        if (this.hoveredId !== d.id) {
            this.hoveredId = d.id;
        }
        else {
            this.hoveredId = "";
        }
        this.generateOpacity();
        this.generateText();
    };
    D3ContainerComponent.prototype.dragstarted = function (d) {
        if (!__WEBPACK_IMPORTED_MODULE_3_d3__["b" /* event */].active)
            this.simulation.alphaTarget(0.3).restart();
        this.clickedId = d.id;
        d.fx = d.x;
        d.fy = d.y;
    };
    D3ContainerComponent.prototype.dragged = function (d) {
        d.fx = __WEBPACK_IMPORTED_MODULE_3_d3__["b" /* event */].x;
        d.fy = __WEBPACK_IMPORTED_MODULE_3_d3__["b" /* event */].y;
    };
    D3ContainerComponent.prototype.dragended = function (d) {
        this.clickedId = "";
        this.generateOpacity();
        this.generateText();
        if (!this.paused) {
            d.fx = null;
            d.fy = null;
        }
    };
    // GENERATE TEXT / OPACITY ===========================
    D3ContainerComponent.prototype.generateText = function () {
        var _this = this;
        var mousedId = this.clickedId || this.hoveredId;
        this.text.text(function (o) {
            if (_this.highlightedId && _this.adjacent(_this.highlightedId, o)
                || mousedId && _this.adjacent(o, mousedId)
                || _this.relatedSearch(o)) {
                return _this.unextended(o.name);
            }
            else {
                return _this.abbreviate(o.name);
            }
        });
    };
    D3ContainerComponent.prototype.generateOpacity = function () {
        var _this = this;
        var opacity;
        if (this.highlightedId) {
            opacity = .1;
        }
        else if (this.hoveredId || this.clickedId) {
            opacity = .3;
        }
        else {
            opacity = this.searchedId ? .5 : 1;
        }
        var partialOpacity = .5;
        var linkFactor = .6;
        var mousedId = this.clickedId || this.hoveredId;
        this.node.style("opacity", function (o) {
            if (_this.relatedSearch(o)) {
                return 1;
            }
            else if (_this.adjacent(o, _this.highlightedId)) {
                return 1;
            }
            else if (_this.adjacent(o, mousedId)) {
                return _this.highlightedId ? partialOpacity : 1;
            }
            else {
                return opacity;
            }
        });
        this.node.style("stroke", function (o) {
            if (o.id === _this.highlightedId) {
                return "#ccf";
            }
            else if (o.id === mousedId) {
                return "#99c";
            }
            else if (_this.relatedSearch(o)) {
                return "#7b7";
            }
            else {
                return "#232b42";
            }
        });
        this.link.style("opacity", function (o) {
            if (_this.highlightedId === o.source.id || _this.highlightedId === o.target.id) {
                return linkFactor;
            }
            else if (mousedId === o.source.id || mousedId === o.target.id) {
                return _this.highlightedId ? linkFactor * .7 : linkFactor;
            }
            else {
                return linkFactor * opacity;
            }
        });
        this.text.style("opacity", function (o) {
            if (_this.relatedSearch(o) || _this.adjacent(o, _this.highlightedId)) {
                return 1;
            }
            else if (_this.adjacent(o, mousedId)) {
                return _this.highlightedId ? partialOpacity : 1;
            }
            else {
                return opacity;
            }
        });
    };
    D3ContainerComponent.prototype.relatedSearch = function (d) {
        if (!this.searchedId) {
            return false;
        }
        var name = d.name.toLowerCase();
        var query = this.searchedId.toLowerCase().split(" ");
        for (var i = 0; i < query.length; i++) {
            if (!name.includes(query[i])) {
                return false;
            }
        }
        return true;
    };
    // EVENT LISTENERS - SEARCH / PAUSE ====================
    D3ContainerComponent.prototype.handleSearch = function () {
        if (!this.node) {
            return;
        }
        this.generateOpacity();
        this.generateText();
    };
    D3ContainerComponent.prototype.handleClearSearch = function () {
        // document.getElementById('search').value = "";
        // search.value = "";
        this.searchedId = "";
        if (!this.node) {
            return;
        }
        this.generateOpacity();
        this.generateText();
    };
    D3ContainerComponent.prototype.handlePause = function () {
        if (!this.node) {
            return;
        }
        if (this.paused) {
            this.paused = false;
            this.node.each(function (d) {
                d.fx = null;
                d.fy = null;
            });
        }
        else {
            this.paused = true;
            // icon.classList.add("fa-play");
            // icon.classList.remove("fa-pause");
            this.node.each(function (d) {
                d.fx = d.x;
                d.fy = d.y;
            });
        }
    };
    // MISC HELPER METHODS ============================
    D3ContainerComponent.prototype.color = function (d) {
        var group = d.group;
        var colors = [
            "#9e6bba",
            "#309b55",
            "#4286f4",
            "#6a7384",
            "#844040",
            "#c49c25"
        ];
        return colors[group % 6];
    };
    D3ContainerComponent.prototype.abbreviate = function (name) {
        var abb;
        var extensionless = name.match(/(.*)\.[jt]s/)[1];
        var split = extensionless.split(/[-_\.]/);
        if (split.length > 1) {
            return split.map(function (word) { return word[0]; }).join("");
        }
        else {
            return name[0] + extensionless.slice(1).split(/[a-z]/).join("");
        }
    };
    D3ContainerComponent.prototype.unextended = function (name) {
        return name.match(/^(.*)\.[A-Za-z]+$/)[1];
    };
    D3ContainerComponent.prototype.distance = function (d) {
        var offset = d.target.r + d.source.r;
        var containerless = function (name) { return name.split(/(_container)|\./)[0]; };
        if (containerless(d.source.id) === containerless(d.target.id)) {
            return 60 + offset;
        }
        var distanceDenom = 200 + Math.min(this.graph.nodes.length * 2, 250);
        return 30000 / distanceDenom + offset;
    };
    D3ContainerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'app-d3-container',
            template: __webpack_require__("./src/app/d3-container/d3-container.component.html"),
            styles: [__webpack_require__("./src/app/d3-container/d3-container.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__git_api_service__["a" /* GitApiService */],
            __WEBPACK_IMPORTED_MODULE_0__sidebar_content_service__["a" /* SidebarContentService */]])
    ], D3ContainerComponent);
    return D3ContainerComponent;
}());



/***/ }),

/***/ "./src/app/git-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GitApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_zip__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/zip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_base_64__ = __webpack_require__("./node_modules/base-64/base64.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_base_64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_base_64__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var GitApiService = /** @class */ (function () {
    function GitApiService(http, sidebarContentService) {
        var _this = this;
        this.http = http;
        this.sidebarContentService = sidebarContentService;
        this.paramsChange = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["a" /* Subject */]();
        this.user = "";
        this.repo = "";
        this.subdir = "";
        this.loading = false;
        this._ = {
            sha: "",
            files: [],
            fetched: 0,
            parsed: 0,
            unparsed: 0,
            rootDirs: [],
            filePathSet: new Set(),
        };
        this.graphChange = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["a" /* Subject */]();
        this.graphJSON = {
            nodes: [],
            links: [],
        };
        this.graphChange.subscribe();
        this.paramsChange.subscribe(function (params) {
            _this.user = params.user;
            _this.repo = params.repo;
            if (params.subdir) {
                _this.subdir = params.subdir;
            }
        });
    }
    GitApiService.prototype.handleSubmit = function (params) {
        var _this = this;
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
        return this._getRepo().subscribe(function (response) { return _this._processRepoResponse(response); }, function (error) {
            _this.sidebarContentService.setContent(_this._englishifyError(error));
            _this.loading = false;
        });
    };
    GitApiService.prototype._setParams = function (params) {
        this.user = params.user;
        this.repo = params.repo;
        this.subdir = params.subdir;
    };
    GitApiService.prototype._getRepo = function () {
        return this.http.get("https://api.github.com/repos/" + this.user + "/" + this.repo + "/commits", {
            headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' }
        });
    };
    GitApiService.prototype._processRepoResponse = function (response) {
        var _this = this;
        this._.sha = response[0].sha;
        return this._getSha().subscribe(function (response) { return _this._processShaResponse(response); }, function (error) {
            _this.sidebarContentService.setContent(_this._englishifyError(error));
            _this.loading = false;
        });
    };
    GitApiService.prototype._getSha = function () {
        return this.http.get("https://api.github.com/repos/" + this.user + "/" + this.repo + "/git/trees/" + this._.sha + "?recursive=1", {
            headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' }
        });
    };
    GitApiService.prototype._processShaResponse = function (response) {
        var _this = this;
        this._.files = this._parseTree(response);
        if (this._.files.length > 200) {
            // raise error or something, or maybe you don't even need to raise an error
            this.sidebarContentService.setContent("Repo too large: " + this._.files.length + " files found.\n\nThere is a limit of 200 files to avoid flooding the Github servers.\n\nMaybe specify a subdirectory?");
            return;
        }
        this._.rootDirs = this._parseRootDirs();
        this._.filePathSet = new Set(Object.values(this._.files).map(function (file) { return file.path; }));
        this._.parsed = 0;
        this._.fetched = 0;
        this._.unparsed = 0;
        this._setMessage;
        var observables = [];
        var _loop_1 = function (i) {
            var file = this_1._.files[i];
            observables.push(this_1._getFile(file.url).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["c" /* tap */])(function (res) { return _this._processFile(file.path, res); }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["a" /* catchError */])(function (err) { return _this._handleFileError(); })));
        };
        var this_1 = this;
        for (var i = 0; i < this._.files.length; i++) {
            _loop_1(i);
        }
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_zip__["a" /* zip */].apply(void 0, observables).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* delay */])(1500))
            .subscribe(function (_) {
            _this.loading = false;
            _this._sanitizeGraph();
            _this.graphChange.next(_this.graphJSON);
            var totalLines = 0;
            _this.graphJSON.nodes.forEach(function (node) {
                totalLines += node.loc;
            });
            _this.sidebarContentService.setData({
                totalLines: totalLines,
                totalFiles: _this.graphJSON.nodes.length
            });
            _this.sidebarContentService.setHelpMessage();
        });
    };
    GitApiService.prototype._getFile = function (url) {
        return this.http.get(url, {
            headers: {
                'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==',
            }
        });
    };
    GitApiService.prototype._processFile = function (filePath, res) {
        var content = Object(__WEBPACK_IMPORTED_MODULE_7_base_64__["decode"])(res.content);
        this._.fetched++;
        this._setMessage();
        var contentArr = content.split(/\r?\n/);
        var fileName = this._parseName(filePath);
        this._addNode(filePath, contentArr.length, content);
        this._addLinks(filePath, contentArr);
        this._.parsed++;
        this._setMessage();
    };
    GitApiService.prototype._handleFileError = function () {
        this._.unparsed++;
        this._setMessage();
        return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])(null);
    };
    GitApiService.prototype._englishifyError = function (error) {
        if (error.status === 404) {
            return "404: Sorry, we couldn't find that repo!";
        }
        else {
            console.log(error);
            return "Sorry, we couldn't process the repo for an unknown reason.\nPlease check the console logs.";
        }
    };
    GitApiService.prototype._setMessage = function () {
        var finishedMessage = "";
        if (this._.files.length === this._.parsed + this._.unparsed) {
            finishedMessage = "Repository loaded!";
        }
        this.sidebarContentService.setContent("Repo found. Fetching and parsing files...\n    \n   Fetched files: " + this._.fetched + " / " + this._.files.length + "\n    Parsed files: " + this._.parsed + " / " + this._.files.length + "\nUnparsable files: " + this._.unparsed + "\n\n" + finishedMessage);
    };
    // ================================================================
    GitApiService.prototype._parseTree = function (response) {
        var _this = this;
        return response.tree.filter(function (file) {
            if (_this._forbiddenFile(file.path)) {
                return false;
            }
            if (_this.subdir) {
                var splitSubdir = _this.subdir.split("/");
                var splitPath = file.path.split("/");
                for (var i = 0; i < splitSubdir.length; i++) {
                    if (splitSubdir[i] !== splitPath[i]) {
                        return false;
                    }
                }
            }
            return true;
        });
    };
    GitApiService.prototype._parseRootDirs = function () {
        var _this = this;
        var rootDirs = new Set();
        this._.files.forEach(function (file) {
            rootDirs.add(_this._parseRoot(file.path));
        });
        return Array.from(rootDirs);
    };
    GitApiService.prototype._parseRoot = function (path) {
        var pathArr = path.split("/");
        var subArr = this.subdir.split("/");
        if (subArr[subArr.length - 1] === pathArr[subArr.length - 1]) {
            return pathArr[subArr.length] ? pathArr[subArr.length] : pathArr[subArr.length - 1];
        }
        else {
            return pathArr[0];
        }
    };
    GitApiService.prototype._forbiddenFile = function (path) {
        var parsedName = this._parseName(path);
        var ext = this._extension(path);
        return parsedName.match(/((bundle).*\.(js))/)
            || parsedName.match(/((webpack).*\.(config))/)
            || !["ts", "js", "jsx"].includes(ext)
            || ["ts", "js", "jsx"].includes(path); // will otherwise break when folders are named js
    };
    GitApiService.prototype._extension = function (path) {
        var splitPath = path.split(".");
        return splitPath[splitPath.length - 1];
    };
    GitApiService.prototype._parseName = function (path) {
        var splitPath = path.split("/");
        return splitPath[splitPath.length - 1];
    };
    GitApiService.prototype._parseLinks = function (filePath, contentArr) {
        var links = [];
        for (var i = 0; i < contentArr.length; i++) {
            var line = contentArr[i];
            // Match 'from' or 'require' statements with './'
            var regex = line.match(/((from)|(require\s*\())\s*['"]([^'"]*\.\/[^'"]*)['"]/);
            if (regex && !line.match(/^.{0,7}\/[\*\/]/)) {
                links.push({
                    "source": this._parsePath(filePath, regex[regex.length - 1]),
                    "target": filePath
                });
            }
        }
        return links;
    };
    GitApiService.prototype._parsePath = function (filePath, parsedImport) {
        var sectionArr = parsedImport.split("/");
        var pathArr = filePath.split("/");
        pathArr.pop();
        var newPath;
        sectionArr.forEach(function (section) {
            if (section === '..') {
                pathArr.pop();
            }
            else if (section !== ".") {
                pathArr.push(section);
            }
        });
        var combinedPath = pathArr.join("/");
        if (this._.filePathSet.has(combinedPath)) {
            return combinedPath;
        }
        else if (this._.filePathSet.has(combinedPath + ".js")) {
            return combinedPath + ".js";
        }
        else if (this._.filePathSet.has(combinedPath + ".jsx")) {
            return combinedPath + ".jsx";
        }
        else {
            return combinedPath + ".ts";
        }
    };
    GitApiService.prototype._addNode = function (filePath, length, content) {
        var name = this._parseName(filePath);
        var node = {
            id: filePath,
            name: name,
            extension: this._extension(filePath),
            loc: length,
            group: this._.rootDirs.indexOf(this._parseRoot(filePath)),
            content: content,
        };
        this.graphJSON.nodes.push(node);
    };
    GitApiService.prototype._addLinks = function (filePath, contentArr) {
        var _this = this;
        var links = this._parseLinks(filePath, contentArr);
        links.forEach(function (link) {
            _this.graphJSON.links.push(link);
        });
    };
    GitApiService.prototype._sanitizeGraph = function () {
        var newGraph = {
            "links": [],
            "nodes": this.graphJSON.nodes
        };
        var names = new Set(this.graphJSON.nodes.map(function (node) { return node.id; }));
        this.graphJSON.links.forEach(function (link) {
            if (names.has(link.source) && names.has(link.target)) {
                newGraph.links.push(link);
            }
        });
        this.graphJSON = newGraph;
    };
    // ==================================
    GitApiService.prototype._clearVars = function () {
        this._ = {
            sha: "",
            files: [],
            fetched: 0,
            parsed: 0,
            unparsed: 0,
            rootDirs: [],
            filePathSet: new Set(),
        };
        this.graphJSON = {
            nodes: [],
            links: [],
        };
    };
    GitApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__["a" /* SidebarContentService */]])
    ], GitApiService);
    return GitApiService;
}());



/***/ }),

/***/ "./src/app/sample-repos/sample-repos.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sample-repos/sample-repos.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sample-buttons\">\n  <div class=\"button-title\">\n    Examples:\n  </div>\n  <div class=\"button-example\" (click)=\"handleSubmit('express')\">\n    Express\n  </div>\n  <div class=\"button-example\" (click)=\"handleSubmit('redux')\">\n    Redux\n  </div>\n  <div class=\"button-example\" (click)=\"handleSubmit('react')\">\n    React\n  </div>\n  <div class=\"button-example\" (click)=\"handleSubmit('slic')\">\n    Slic\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sample-repos/sample-repos.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleReposComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__git_api_service__ = __webpack_require__("./src/app/git-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SampleReposComponent = /** @class */ (function () {
    function SampleReposComponent(gitApiService) {
        this.gitApiService = gitApiService;
        this.examples = {
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
    }
    SampleReposComponent.prototype.ngOnInit = function () {
    };
    SampleReposComponent.prototype.handleSubmit = function (repo) {
        this.gitApiService.handleSubmit(this.examples[repo]);
    };
    SampleReposComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'app-sample-repos',
            template: __webpack_require__("./src/app/sample-repos/sample-repos.component.html"),
            styles: [__webpack_require__("./src/app/sample-repos/sample-repos.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__git_api_service__["a" /* GitApiService */]])
    ], SampleReposComponent);
    return SampleReposComponent;
}());



/***/ }),

/***/ "./src/app/sidebar-content.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarContentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarContentService = /** @class */ (function () {
    function SidebarContentService() {
        var _this = this;
        this.content = "";
        this.data = {
            totalLines: "",
            totalFiles: "",
            currentFile: "",
            currentLoc: "",
        };
        this.contentChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.contentChange.subscribe(function (val) { return _this.content = val; });
        this.dataChange.subscribe(function (data) { return _this.data = data; });
    }
    SidebarContentService.prototype.setContent = function (str) {
        this.contentChange.next(str);
    };
    SidebarContentService.prototype.setHelpMessage = function () {
        this.contentChange.next("INSTRUCTIONS:\n\n* Click and drag to move nodes around.\n\n* Click on a node to see its contents.\n\n* Click on the same node or the background to return\nto the main view, or click on a different node to\nselect a new node.\n\n* Search a file using the search box: to find a file\nnamed \"message_form_container.jsx\", it's enough to\nsearch for \"mes form cont\".\n\n* Press pause to pause the simulation.");
    };
    SidebarContentService.prototype.setData = function (data) {
        this.dataChange.next(Object.assign(this.data, data));
    };
    SidebarContentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SidebarContentService);
    return SidebarContentService;
}());



/***/ }),

/***/ "./src/app/sidebar-content/sidebar-content.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sidebar-content/sidebar-content.component.html":
/***/ (function(module, exports) {

module.exports = "<pre class=\"file-content\">\n{{content}}\n</pre>\n"

/***/ }),

/***/ "./src/app/sidebar-content/sidebar-content.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarContentComponent = /** @class */ (function () {
    function SidebarContentComponent(sidebarContentService) {
        var _this = this;
        this.sidebarContentService = sidebarContentService;
        this.content = "";
        this.sidebarContentService.contentChange.subscribe(function (value) { return _this.content = value; });
    }
    SidebarContentComponent.prototype.ngOnInit = function () {
    };
    SidebarContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-sidebar-content',
            template: __webpack_require__("./src/app/sidebar-content/sidebar-content.component.html"),
            styles: [__webpack_require__("./src/app/sidebar-content/sidebar-content.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__["a" /* SidebarContentService */]])
    ], SidebarContentComponent);
    return SidebarContentComponent;
}());



/***/ }),

/***/ "./src/app/sidebar-data/sidebar-data.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sidebar-data/sidebar-data.component.html":
/***/ (function(module, exports) {

module.exports = "<pre class=\"sidebar-data\">\nhttps://api.github.com/repos/{{data.user}}/{{data.repo}}/{{data.subdir}}\n     Current user: {{data.user}}\n     Current repo: {{data.repo}}\n   Current subdir: {{data.subdir}}\n      Total lines: {{data.totalLines}}\n      Total files: {{data.totalFiles}}\nCurrent directory: {{data.currentFile}}\n    Current lines: {{data.currentLoc}}\n</pre>\n"

/***/ }),

/***/ "./src/app/sidebar-data/sidebar-data.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarDataComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__git_api_service__ = __webpack_require__("./src/app/git-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarDataComponent = /** @class */ (function () {
    function SidebarDataComponent(sidebarContentService, gitApiService) {
        var _this = this;
        this.sidebarContentService = sidebarContentService;
        this.gitApiService = gitApiService;
        this.data = {
            user: "",
            repo: "",
            subdir: "",
            totalLines: "",
            totalFiles: "",
            currentFile: "",
            currentLoc: "",
        };
        this.sidebarContentService.dataChange.subscribe(function (value) { return _this.data = Object.assign(_this.data, value); });
        this.gitApiService.paramsChange.subscribe(function (value) { return _this.data = Object.assign(_this.data, value); });
    }
    SidebarDataComponent.prototype.ngOnInit = function () {
    };
    SidebarDataComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'app-sidebar-data',
            template: __webpack_require__("./src/app/sidebar-data/sidebar-data.component.html"),
            styles: [__webpack_require__("./src/app/sidebar-data/sidebar-data.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sidebar_content_service__["a" /* SidebarContentService */],
            __WEBPACK_IMPORTED_MODULE_0__git_api_service__["a" /* GitApiService */]])
    ], SidebarDataComponent);
    return SidebarDataComponent;
}());



/***/ }),

/***/ "./src/app/sidebar-form/sidebar-form.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sidebar-form/sidebar-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-options\">\n  <form (ngSubmit)=\"handleSubmit()\">\n    <div class=\"input-fields\">\n\n      <div class=\"input-fields\">\n        <div class=\"input-fields-top\">\n          <label class=\"input-text-label\">Github User\n            <input class=\"input-text input-user\" [(ngModel)]=\"params.user\" (ngModelChange)=\"handleChange()\" name=\"user\" type=\"text\">\n            <span></span>\n          </label>\n          <label class=\"input-text-label\">Repository\n            <input class=\"input-text input-repo\" [(ngModel)]=\"params.repo\" (ngModelChange)=\"handleChange()\" name=\"repo\" type=\"text\">\n            <span></span>\n          </label>\n          <label class=\"input-text-label\">\n            <div>\n              Subdir\n              <div class=\"optional-tag\">(optional)</div>\n            </div>\n            <input class=\"input-text input-subdir\" [(ngModel)]=\"params.subdir\" (ngModelChange)=\"handleChange()\" name=\"subdir\" type=\"text\">\n            <span></span>\n          </label>\n          <label class=\"input-submit-label\">\n            <input class=\"input-submit\" type=\"submit\" value=\"submit\">\n          </label>\n        </div>\n\n        <div class=\"input-fields-bottom\">\n          <label class=\"input-url-label\">\n            <div>\n              Github URL\n              <div class=\"optional-tag\">\n                (optional)\n              </div>\n            </div>\n            <input class=\"input-text input-url\" [(ngModel)]=\"params.url\" (ngModelChange)=\"handleUrlChange()\" name=\"url\" type=\"text\">\n            <span></span>\n          </label>\n        </div>\n      </div>\n\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/sidebar-form/sidebar-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_content_service__ = __webpack_require__("./src/app/sidebar-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_api_service__ = __webpack_require__("./src/app/git-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarFormComponent = /** @class */ (function () {
    function SidebarFormComponent(gitApiService, sidebarContentService) {
        this.gitApiService = gitApiService;
        this.sidebarContentService = sidebarContentService;
        this.params = {
            user: "",
            repo: "",
            subdir: "",
            url: "",
        };
    }
    SidebarFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gitApiService.paramsChange.subscribe(function (params) {
            _this.params = Object.assign(_this.params, params);
            _this.makeUrl();
        });
    };
    SidebarFormComponent.prototype.handleChange = function () {
        this.makeUrl();
    };
    SidebarFormComponent.prototype.handleUrlChange = function () {
        this.parseUrl();
    };
    SidebarFormComponent.prototype.handleSubmit = function () {
        // TODO: error handling for empty fields
        if (!this.params.user || !this.params.repo) {
            this.sidebarContentService.setContent("Please enter both a username and a repo.");
        }
        else {
            this.gitApiService.handleSubmit(this.params);
        }
    };
    SidebarFormComponent.prototype.makeUrl = function () {
        var url = "https://github.com/" + this.params.user;
        if (this.params.repo) {
            url += '/' + this.params.repo;
        }
        if (this.params.subdir) {
            url += '/tree/master/' + this.params.subdir;
        }
        this.params.url = url;
    };
    SidebarFormComponent.prototype.parseUrl = function () {
        var urlTag = this.params.url.match(/github\.com\/(.*)/);
        if (urlTag) {
            var urlTagArr = urlTag[1].split("/");
            this.params.user = urlTagArr[0] ? urlTagArr[0] : "";
            this.params.repo = urlTagArr[1] ? urlTagArr[1] : "";
            if (urlTagArr[2] === "tree" && urlTagArr[3] === "master"
                && urlTagArr[4]) {
                this.params.subdir = urlTagArr.slice(4).join("/");
            }
            else {
                this.params.subdir = "";
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SidebarFormComponent.prototype, "params", void 0);
    SidebarFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'app-sidebar-form',
            template: __webpack_require__("./src/app/sidebar-form/sidebar-form.component.html"),
            styles: [__webpack_require__("./src/app/sidebar-form/sidebar-form.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__git_api_service__["a" /* GitApiService */],
            __WEBPACK_IMPORTED_MODULE_0__sidebar_content_service__["a" /* SidebarContentService */]])
    ], SidebarFormComponent);
    return SidebarFormComponent;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-main\">\n  <app-sidebar-form></app-sidebar-form>\n  <app-sidebar-data></app-sidebar-data>\n  <app-sidebar-content></app-sidebar-content>\n</div>\n"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-sidebar',
            template: __webpack_require__("./src/app/sidebar/sidebar.component.html"),
            styles: [__webpack_require__("./src/app/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map