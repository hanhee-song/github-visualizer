(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-help-modal *ngIf=\"this.modal === 'help'\"></app-help-modal>\r\n\r\n<div class=\"title-wrapper\">\r\n  <div>Github</div>&nbsp;\r\n  <div>Filetree</div>&nbsp;\r\n  <div>Visualizer</div>\r\n  <div class=\"button-help\"\r\n    (click)=\"openModal('help')\">\r\n    ?\r\n  </div>\r\n</div>\r\n\r\n<app-sample-repos></app-sample-repos>\r\n\r\n<div class=\"main\">\r\n  <app-sidebar></app-sidebar>\r\n  <app-d3-container style=\"width: 100%;\"></app-d3-container>\r\n</div>\r\n\r\n<div class=\"name\">\r\n  Hanhee Song\r\n</div>\r\n<div class=\"about-me\">\r\n  <a href=\"https://github.com/hanhee-song/project-visualizer\" rel=\"noopener noreferrer\" target=\"_blank\">\r\n    <i class=\"fa fa-github\" aria-hidden=\"true\"></i>\r\n  </a>\r\n  <a href=\"https://www.linkedin.com/in/hanhee-song\" rel=\"noopener noreferrer\" target=\"_blank\">\r\n    <i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i>\r\n  </a>\r\n  <a href=\"mailto:song.hanhee@gmail.com\">\r\n    <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>&nbsp;\r\n    <div class=\"text\">song.hanhee@gmail.com</div>\r\n  </a>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.modal = "help";
        this.modalService.modalChange.subscribe(function (modal) { return _this.modal = modal; });
    }
    AppComponent.prototype.openModal = function (modal) {
        this.modalService.openModal(modal);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_modal_service__WEBPACK_IMPORTED_MODULE_0__["ModalService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var _components_sidebar_form_sidebar_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sidebar-form/sidebar-form.component */ "./src/app/components/sidebar-form/sidebar-form.component.ts");
/* harmony import */ var _components_sidebar_data_sidebar_data_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/sidebar-data/sidebar-data.component */ "./src/app/components/sidebar-data/sidebar-data.component.ts");
/* harmony import */ var _components_sidebar_content_sidebar_content_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/sidebar-content/sidebar-content.component */ "./src/app/components/sidebar-content/sidebar-content.component.ts");
/* harmony import */ var _services_git_api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/git-api.service */ "./src/app/services/git-api.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
/* harmony import */ var _components_d3_container_d3_container_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/d3-container/d3-container.component */ "./src/app/components/d3-container/d3-container.component.ts");
/* harmony import */ var _components_sample_repos_sample_repos_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/sample-repos/sample-repos.component */ "./src/app/components/sample-repos/sample-repos.component.ts");
/* harmony import */ var _components_help_modal_help_modal_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/help-modal/help-modal.component */ "./src/app/components/help-modal/help-modal.component.ts");
/* harmony import */ var _directives_click_stop_propagation_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/click-stop-propagation.directive */ "./src/app/directives/click-stop-propagation.directive.ts");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
                _components_sidebar_form_sidebar_form_component__WEBPACK_IMPORTED_MODULE_6__["SidebarFormComponent"],
                _components_sidebar_data_sidebar_data_component__WEBPACK_IMPORTED_MODULE_7__["SidebarDataComponent"],
                _components_sidebar_content_sidebar_content_component__WEBPACK_IMPORTED_MODULE_8__["SidebarContentComponent"],
                _components_d3_container_d3_container_component__WEBPACK_IMPORTED_MODULE_12__["D3ContainerComponent"],
                _components_sample_repos_sample_repos_component__WEBPACK_IMPORTED_MODULE_13__["SampleReposComponent"],
                _components_help_modal_help_modal_component__WEBPACK_IMPORTED_MODULE_14__["HelpModalComponent"],
                _directives_click_stop_propagation_directive__WEBPACK_IMPORTED_MODULE_15__["ClickStopPropagationDirective"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
                _angular_service_worker__WEBPACK_IMPORTED_MODULE_16__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].production })
            ],
            providers: [
                _services_git_api_service__WEBPACK_IMPORTED_MODULE_9__["GitApiService"],
                _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_11__["SidebarContentService"],
                _services_modal_service__WEBPACK_IMPORTED_MODULE_0__["ModalService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/d3-container/d3-container.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/d3-container/d3-container.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZDMtY29udGFpbmVyL2QzLWNvbnRhaW5lci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/d3-container/d3-container.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/d3-container/d3-container.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"svg-container\">\r\n  <div class=\"top-options\">\r\n    <div class=\"top-options-search\">\r\n      <label class=\"search-label\">\r\n        <input id=\"search\"\r\n          class=\"input-text\"\r\n          [(ngModel)]=\"searchedId\"\r\n          (ngModelChange)=\"handleSearch()\"\r\n          type=\"text\"\r\n          placeholder=\"Search\"\r\n          name=\"searchedId\">\r\n        <span></span>\r\n      </label>\r\n      <div id=\"search-clear\"\r\n        (click)=\"handleClearSearch()\">\r\n        x\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"pause-button\"\r\n      (click)=\"handlePause()\">\r\n      <i class=\"fa toggle-pause-icon\"\r\n        [ngClass]=\"!paused ? 'fa-pause' : 'fa-play'\"\r\n        aria-hidden=\"true\"></i>\r\n    </div>\r\n  </div>\r\n  <svg class=\"svg-main\" width=\"500\" height=\"474\">\r\n  </svg>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/d3-container/d3-container.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/d3-container/d3-container.component.ts ***!
  \*******************************************************************/
/*! exports provided: D3ContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3ContainerComponent", function() { return D3ContainerComponent; });
/* harmony import */ var _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
/* harmony import */ var _services_git_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/git-api.service */ "./src/app/services/git-api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
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
        this.gitApiService.getGraphChange().subscribe(function (graph) {
            _this.drawGraph(graph);
        });
    }
    D3ContainerComponent.prototype.ngOnInit = function () {
    };
    // D3 LIVES HERE =======================================
    D3ContainerComponent.prototype.drawGraph = function (graph) {
        var _this = this;
        this.graph = graph;
        var svg = d3__WEBPACK_IMPORTED_MODULE_3__["select"]('.svg-main');
        svg.selectAll("g").remove();
        svg.selectAll("text").remove();
        this.width = Number(svg.attr("width"));
        this.height = Number(svg.attr("height"));
        svg.on("click", this.unhighlightNode.bind(this));
        this.simulation = d3__WEBPACK_IMPORTED_MODULE_3__["forceSimulation"]()
            .force("link", d3__WEBPACK_IMPORTED_MODULE_3__["forceLink"]()
            .distance(function (d) { return _this.distance(d); })
            .strength(1)
            .id(function (d) { return d.id; }))
            .force("charge", d3__WEBPACK_IMPORTED_MODULE_3__["forceManyBody"](0))
            .force("collision", d3__WEBPACK_IMPORTED_MODULE_3__["forceCollide"](10));
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
            .call(d3__WEBPACK_IMPORTED_MODULE_3__["drag"]()
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
        d3__WEBPACK_IMPORTED_MODULE_3__["event"].stopPropagation();
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
        if (!d3__WEBPACK_IMPORTED_MODULE_3__["event"].active)
            this.simulation.alphaTarget(0.3).restart();
        this.clickedId = d.id;
        d.fx = d.x;
        d.fy = d.y;
    };
    D3ContainerComponent.prototype.dragged = function (d) {
        d.fx = d3__WEBPACK_IMPORTED_MODULE_3__["event"].x;
        d.fy = d3__WEBPACK_IMPORTED_MODULE_3__["event"].y;
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-d3-container',
            template: __webpack_require__(/*! ./d3-container.component.html */ "./src/app/components/d3-container/d3-container.component.html"),
            styles: [__webpack_require__(/*! ./d3-container.component.css */ "./src/app/components/d3-container/d3-container.component.css")]
        }),
        __metadata("design:paramtypes", [_services_git_api_service__WEBPACK_IMPORTED_MODULE_1__["GitApiService"],
            _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_0__["SidebarContentService"]])
    ], D3ContainerComponent);
    return D3ContainerComponent;
}());



/***/ }),

/***/ "./src/app/components/help-modal/help-modal.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/help-modal/help-modal.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/help-modal/help-modal.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/help-modal/help-modal.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"help-modal-container visible\"\r\n  (click)=\"handleClose()\">\r\n  <div class=\"help-modal-text\" click-stop-propagation>\r\n    <div class=\"help-modal-x\"\r\n      (click)=\"handleClose()\">\r\n      x\r\n    </div>\r\n    About Github Filetree Visualizer\r\n    <br />\r\n    <br /> This Github visualizer will fetch a repository, map out JavaScript files, and draw links between them based on their\r\n    interdependencies.\r\n    <br />\r\n    <br /> Nodes denote files with a .js, .jsx, .ts, or .tsx extension.\r\n    <br />* The size of the node corresponds to the size of the file.\r\n    <br />* Nodes are colored by subdirectory; e.g. all files in a \"test\" subdirectory will receive the same color.\r\n    <br />\r\n    <br /> Links indicate a connection between two files.\r\n    <br />* The arrow points from the file being exported to the file that is importing it.\r\n    <br />\r\n    <br /> INSTRUCTIONS:\r\n    <br />\r\n    <br /> * Click and drag to move nodes around.\r\n    <br />\r\n    <br /> * Click on a node to see its contents.\r\n    <br />\r\n    <br /> * Click on the same node or the background to return to the main view, or click on a different node to select a new\r\n    node.\r\n    <br />\r\n    <br /> * Search a file using the search box: to find a file named \"message_form_container.jsx\", it's enough to search for \"mes\r\n    form cont\".\r\n    <br />\r\n    <br /> * Press\r\n    <i class=\"fa fa-pause\" aria-hidden=\"true\"></i> to pause the simulation.\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/help-modal/help-modal.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/help-modal/help-modal.component.ts ***!
  \***************************************************************/
/*! exports provided: HelpModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpModalComponent", function() { return HelpModalComponent; });
/* harmony import */ var _logger_log_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../logger/log-wrapper */ "./src/app/logger/log-wrapper.ts");
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../logger/log.service */ "./src/app/logger/log.service.ts");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/modal.service */ "./src/app/services/modal.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HelpModalComponent = /** @class */ (function (_super) {
    __extends(HelpModalComponent, _super);
    function HelpModalComponent(logService, modalService) {
        var _this = _super.call(this, logService) || this;
        _this.logService = logService;
        _this.modalService = modalService;
        return _this;
    }
    HelpModalComponent.prototype.ngOnInit = function () { };
    HelpModalComponent.prototype.ngOnDestroy = function () { };
    HelpModalComponent.prototype.handleClose = function () {
        this.modalService.closeModal();
    };
    HelpModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-help-modal',
            template: __webpack_require__(/*! ./help-modal.component.html */ "./src/app/components/help-modal/help-modal.component.html"),
            styles: [__webpack_require__(/*! ./help-modal.component.css */ "./src/app/components/help-modal/help-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_1__["LogService"],
            _services_modal_service__WEBPACK_IMPORTED_MODULE_2__["ModalService"]])
    ], HelpModalComponent);
    return HelpModalComponent;
}(_logger_log_wrapper__WEBPACK_IMPORTED_MODULE_0__["LogWrapper"]));



/***/ }),

/***/ "./src/app/components/sample-repos/sample-repos.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/sample-repos/sample-repos.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2FtcGxlLXJlcG9zL3NhbXBsZS1yZXBvcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/sample-repos/sample-repos.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/sample-repos/sample-repos.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sample-buttons\">\r\n  <div class=\"button-title\">\r\n    Examples:\r\n  </div>\r\n  <div class=\"button-example\" (click)=\"handleSubmit('express')\">\r\n    Express\r\n  </div>\r\n  <div class=\"button-example\" (click)=\"handleSubmit('redux')\">\r\n    Redux\r\n  </div>\r\n  <div class=\"button-example\" (click)=\"handleSubmit('react')\">\r\n    React\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/sample-repos/sample-repos.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/sample-repos/sample-repos.component.ts ***!
  \*******************************************************************/
/*! exports provided: SampleReposComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleReposComponent", function() { return SampleReposComponent; });
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../logger/log.service */ "./src/app/logger/log.service.ts");
/* harmony import */ var _services_git_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/git-api.service */ "./src/app/services/git-api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _logger_log_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../logger/log-wrapper */ "./src/app/logger/log-wrapper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SampleReposComponent = /** @class */ (function (_super) {
    __extends(SampleReposComponent, _super);
    function SampleReposComponent(logService, gitApiService) {
        var _this = _super.call(this, logService) || this;
        _this.logService = logService;
        _this.gitApiService = gitApiService;
        _this.examples = {
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
        return _this;
    }
    SampleReposComponent.prototype.ngOnInit = function () {
        var _this = this;
        var initialRepo = {
            user: "hanhee-song",
            repo: "github-visualizer",
            subdir: "src/app",
        };
        setTimeout(function () {
            _this.gitApiService.handleSubmit(initialRepo);
        }, 10);
    };
    SampleReposComponent.prototype.ngOnDestroy = function () { };
    SampleReposComponent.prototype.handleSubmit = function (repo) {
        this.gitApiService.handleSubmit(this.examples[repo]);
    };
    SampleReposComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-sample-repos',
            template: __webpack_require__(/*! ./sample-repos.component.html */ "./src/app/components/sample-repos/sample-repos.component.html"),
            styles: [__webpack_require__(/*! ./sample-repos.component.css */ "./src/app/components/sample-repos/sample-repos.component.css")]
        }),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_0__["LogService"],
            _services_git_api_service__WEBPACK_IMPORTED_MODULE_1__["GitApiService"]])
    ], SampleReposComponent);
    return SampleReposComponent;
}(_logger_log_wrapper__WEBPACK_IMPORTED_MODULE_3__["LogWrapper"]));



/***/ }),

/***/ "./src/app/components/sidebar-content/sidebar-content.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/components/sidebar-content/sidebar-content.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lkZWJhci1jb250ZW50L3NpZGViYXItY29udGVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/sidebar-content/sidebar-content.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/components/sidebar-content/sidebar-content.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<pre class=\"file-content\">\r\n{{content}}\r\n</pre>\r\n"

/***/ }),

/***/ "./src/app/components/sidebar-content/sidebar-content.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/sidebar-content/sidebar-content.component.ts ***!
  \*************************************************************************/
/*! exports provided: SidebarContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarContentComponent", function() { return SidebarContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-content',
            template: __webpack_require__(/*! ./sidebar-content.component.html */ "./src/app/components/sidebar-content/sidebar-content.component.html"),
            styles: [__webpack_require__(/*! ./sidebar-content.component.css */ "./src/app/components/sidebar-content/sidebar-content.component.css")]
        }),
        __metadata("design:paramtypes", [_services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__["SidebarContentService"]])
    ], SidebarContentComponent);
    return SidebarContentComponent;
}());



/***/ }),

/***/ "./src/app/components/sidebar-data/sidebar-data.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/sidebar-data/sidebar-data.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lkZWJhci1kYXRhL3NpZGViYXItZGF0YS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/sidebar-data/sidebar-data.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/sidebar-data/sidebar-data.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<pre class=\"sidebar-data\">\r\nhttps://api.github.com/repos/{{data.user}}/{{data.repo}}/{{data.subdir}}\r\n     Current user: {{data.user}}\r\n     Current repo: {{data.repo}}\r\n   Current subdir: {{data.subdir}}\r\n      Total lines: {{data.totalLines}}\r\n      Total files: {{data.totalFiles}}\r\nCurrent directory: {{data.currentFile}}\r\n    Current lines: {{data.currentLoc}}\r\n</pre>\r\n"

/***/ }),

/***/ "./src/app/components/sidebar-data/sidebar-data.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/sidebar-data/sidebar-data.component.ts ***!
  \*******************************************************************/
/*! exports provided: SidebarDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarDataComponent", function() { return SidebarDataComponent; });
/* harmony import */ var _services_git_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/git-api.service */ "./src/app/services/git-api.service.ts");
/* harmony import */ var _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
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
        this.gitApiService.getParamsChange().subscribe(function (value) { return _this.data = Object.assign(_this.data, value); });
    }
    SidebarDataComponent.prototype.ngOnInit = function () {
    };
    SidebarDataComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-sidebar-data',
            template: __webpack_require__(/*! ./sidebar-data.component.html */ "./src/app/components/sidebar-data/sidebar-data.component.html"),
            styles: [__webpack_require__(/*! ./sidebar-data.component.css */ "./src/app/components/sidebar-data/sidebar-data.component.css")]
        }),
        __metadata("design:paramtypes", [_services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__["SidebarContentService"],
            _services_git_api_service__WEBPACK_IMPORTED_MODULE_0__["GitApiService"]])
    ], SidebarDataComponent);
    return SidebarDataComponent;
}());



/***/ }),

/***/ "./src/app/components/sidebar-form/sidebar-form.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/sidebar-form/sidebar-form.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lkZWJhci1mb3JtL3NpZGViYXItZm9ybS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/sidebar-form/sidebar-form.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/sidebar-form/sidebar-form.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-options\">\r\n  <form (ngSubmit)=\"handleSubmit()\">\r\n    <div class=\"input-fields\">\r\n\r\n      <div class=\"input-fields\">\r\n        <div class=\"input-fields-top\">\r\n          <label class=\"input-text-label\">Github User\r\n            <input class=\"input-text input-user\" [(ngModel)]=\"params.user\" (ngModelChange)=\"handleChange()\" name=\"user\" type=\"text\">\r\n            <span></span>\r\n          </label>\r\n          <label class=\"input-text-label\">Repository\r\n            <input class=\"input-text input-repo\" [(ngModel)]=\"params.repo\" (ngModelChange)=\"handleChange()\" name=\"repo\" type=\"text\">\r\n            <span></span>\r\n          </label>\r\n          <label class=\"input-text-label\">\r\n            <div>\r\n              Subdir\r\n              <div class=\"optional-tag\">(optional)</div>\r\n            </div>\r\n            <input class=\"input-text input-subdir\" [(ngModel)]=\"params.subdir\" (ngModelChange)=\"handleChange()\" name=\"subdir\" type=\"text\">\r\n            <span></span>\r\n          </label>\r\n          <label class=\"input-submit-label\">\r\n            <input class=\"input-submit\" type=\"submit\" value=\"submit\">\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"input-fields-bottom\">\r\n          <label class=\"input-url-label\">\r\n            <div>\r\n              Github URL\r\n              <div class=\"optional-tag\">\r\n                (optional)\r\n              </div>\r\n            </div>\r\n            <input class=\"input-text input-url\" [(ngModel)]=\"params.url\" (ngModelChange)=\"handleUrlChange()\" name=\"url\" type=\"text\">\r\n            <span></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/sidebar-form/sidebar-form.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/sidebar-form/sidebar-form.component.ts ***!
  \*******************************************************************/
/*! exports provided: SidebarFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarFormComponent", function() { return SidebarFormComponent; });
/* harmony import */ var _logger_log_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../logger/log-wrapper */ "./src/app/logger/log-wrapper.ts");
/* harmony import */ var _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
/* harmony import */ var _services_git_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/git-api.service */ "./src/app/services/git-api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../logger/log.service */ "./src/app/logger/log.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SidebarFormComponent = /** @class */ (function (_super) {
    __extends(SidebarFormComponent, _super);
    function SidebarFormComponent(logService, gitApiService, sidebarContentService) {
        var _this = _super.call(this, logService) || this;
        _this.logService = logService;
        _this.gitApiService = gitApiService;
        _this.sidebarContentService = sidebarContentService;
        _this.params = {
            user: "",
            repo: "",
            subdir: "",
            url: "",
        };
        return _this;
    }
    SidebarFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gitApiService.getParamsChange().subscribe(function (params) {
            _this.params = Object.assign(_this.params, params);
            _this.makeUrl();
        });
    };
    SidebarFormComponent.prototype.ngOnDestroy = function () { };
    SidebarFormComponent.prototype.handleChange = function () {
        this.makeUrl();
    };
    SidebarFormComponent.prototype.handleUrlChange = function () {
        this.parseUrl();
    };
    SidebarFormComponent.prototype.handleSubmit = function () {
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        __metadata("design:type", Object)
    ], SidebarFormComponent.prototype, "params", void 0);
    SidebarFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-sidebar-form',
            template: __webpack_require__(/*! ./sidebar-form.component.html */ "./src/app/components/sidebar-form/sidebar-form.component.html"),
            styles: [__webpack_require__(/*! ./sidebar-form.component.css */ "./src/app/components/sidebar-form/sidebar-form.component.css")]
        }),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_4__["LogService"],
            _services_git_api_service__WEBPACK_IMPORTED_MODULE_2__["GitApiService"],
            _services_sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__["SidebarContentService"]])
    ], SidebarFormComponent);
    return SidebarFormComponent;
}(_logger_log_wrapper__WEBPACK_IMPORTED_MODULE_0__["LogWrapper"]));



/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-main\">\r\n  <app-sidebar-form></app-sidebar-form>\r\n  <app-sidebar-data></app-sidebar-data>\r\n  <app-sidebar-content></app-sidebar-content>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.ts ***!
  \*********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/components/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/directives/click-stop-propagation.directive.ts":
/*!****************************************************************!*\
  !*** ./src/app/directives/click-stop-propagation.directive.ts ***!
  \****************************************************************/
/*! exports provided: ClickStopPropagationDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClickStopPropagationDirective", function() { return ClickStopPropagationDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClickStopPropagationDirective = /** @class */ (function () {
    function ClickStopPropagationDirective() {
    }
    ClickStopPropagationDirective.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ClickStopPropagationDirective.prototype, "onClick", null);
    ClickStopPropagationDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[click-stop-propagation]'
        })
    ], ClickStopPropagationDirective);
    return ClickStopPropagationDirective;
}());



/***/ }),

/***/ "./src/app/logger/interfaces.ts":
/*!**************************************!*\
  !*** ./src/app/logger/interfaces.ts ***!
  \**************************************/
/*! exports provided: LogLevelEnum, LogStringEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevelEnum", function() { return LogLevelEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogStringEnum", function() { return LogStringEnum; });
var LogLevelEnum;
(function (LogLevelEnum) {
    LogLevelEnum[LogLevelEnum["NOLOG"] = -1] = "NOLOG";
    LogLevelEnum[LogLevelEnum["ERROR"] = 0] = "ERROR";
    LogLevelEnum[LogLevelEnum["WARN"] = 1] = "WARN";
    LogLevelEnum[LogLevelEnum["INFO"] = 2] = "INFO";
    LogLevelEnum[LogLevelEnum["LOG"] = 3] = "LOG";
    LogLevelEnum[LogLevelEnum["TIMESTAMP"] = 3] = "TIMESTAMP";
    LogLevelEnum[LogLevelEnum["VERBOSE"] = 4] = "VERBOSE";
})(LogLevelEnum || (LogLevelEnum = {}));
var LogStringEnum;
(function (LogStringEnum) {
    LogStringEnum["NOLOG"] = "NOLOG";
    LogStringEnum["ERROR"] = "ERROR";
    LogStringEnum["WARN"] = "WARN";
    LogStringEnum["INFO"] = "INFO";
    LogStringEnum["LOG"] = "LOG";
    LogStringEnum["TIMESTAMP"] = "TIMESTAMP";
    LogStringEnum["VERBOSE"] = "VERBOSE";
})(LogStringEnum || (LogStringEnum = {}));


/***/ }),

/***/ "./src/app/logger/log-queue.ts":
/*!*************************************!*\
  !*** ./src/app/logger/log-queue.ts ***!
  \*************************************/
/*! exports provided: LogQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogQueue", function() { return LogQueue; });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "./src/app/logger/interfaces.ts");

var LogQueue = /** @class */ (function () {
    function LogQueue() {
        this.logGroupQueue = [];
        this.groupIndexStack = [];
    }
    LogQueue.prototype.makeGroup = function (header, logLevel, isCollapsed) {
        var logGroup = {
            isGrouped: true,
            logQueue: [],
            isCollapsed: isCollapsed,
            logQueueHeader: header,
            style: logLevel || _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].LOG,
            depth: this.groupIndexStack.length,
            startDate: new Date(),
            startTime: performance.now(),
        };
        this.logGroupQueue.push(logGroup);
        this.groupIndexStack.push(this.logGroupQueue.length - 1);
    };
    LogQueue.prototype.endGroup = function (header, logLevel, performanceNow) {
        var idx = this.groupIndexStack.pop();
        var group = this.logGroupQueue[idx];
        if (header) {
            group.logQueueHeader = header;
        }
        if (logLevel) {
            group.style = logLevel;
        }
        group.logQueueHeader = this.getNestedGroupHeader(group.logQueueHeader, group.depth);
        group.endTime = performanceNow || performance.now();
        group.style = this.elevateGroupLevel(group);
    };
    /**
     * This function will get the highest log level found within a group
     */
    LogQueue.prototype.elevateGroupLevel = function (group) {
        return group.logQueue.reduce(function (acc, item) {
            return _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"][item.level] < _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"][acc.level] ? item : acc;
        }, { level: group.style }).level;
    };
    LogQueue.prototype.getNestedGroupHeader = function (header, depth) {
        return ' | '.repeat(depth) + header;
    };
    LogQueue.prototype.addToCurrentGroup = function (level, args) {
        this.logGroupQueue[this.groupIndexStack[this.groupIndexStack.length - 1]].logQueue.push({ level: level, args: args });
    };
    LogQueue.prototype.isQueueEmpty = function () {
        return !this.logGroupQueue.length;
    };
    LogQueue.prototype.areAllGroupsEnded = function () {
        return !this.groupIndexStack.length;
    };
    LogQueue.prototype.isMostRecentItemGrouped = function () {
        return this.logGroupQueue[this.logGroupQueue.length - 1].isGrouped;
    };
    LogQueue.prototype.forEach = function (callback) {
        for (var i = 0; i < this.logGroupQueue.length; i++) {
            var group = this.logGroupQueue[i];
            callback(group);
        }
    };
    LogQueue.prototype.clearQueue = function () {
        this.logGroupQueue = [];
    };
    return LogQueue;
}());



/***/ }),

/***/ "./src/app/logger/log-wrapper.ts":
/*!***************************************!*\
  !*** ./src/app/logger/log-wrapper.ts ***!
  \***************************************/
/*! exports provided: LogWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogWrapper", function() { return LogWrapper; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces */ "./src/app/logger/interfaces.ts");
var _a, _b;


var SUBJECTS = Symbol('subjects'), LOG_LEVEL_SUB = Symbol('logLevelSub'), WINDOW_STORE_NAME = Symbol('windowStoreName'), IS_DESTROY_WRAPPED = Symbol('isDestroyWrapped'), IS_COMPONENT_WRAPPED = Symbol('isComponentWrapped'), IS_PROTOTYPE_WRAPPED = Symbol('isPrototypeWrapped'), WRAPPED_FUNCTIONS = Symbol('wrappedFunctions'), NG_ON_DESTROY = Symbol('ngOnDestroy');
var INVALID_KEYS = new Set(['Observable', 'Router', 'User', 'ElementRef']);
var LogWrapper = /** @class */ (function () {
    function LogWrapper(logService) {
        var _this = this;
        this.logService = logService;
        this[_a] = [];
        this[_b] = false;
        if (!LogWrapper.logService) {
            LogWrapper.logService = logService;
        }
        LogWrapper.checkLogLevel(+LogWrapper.logService.getLogLevel(), this);
        var prototype = this.__proto__;
        this[LOG_LEVEL_SUB] = LogWrapper.logService.getLogLevelSubject()
            .subscribe(function (logLevel) {
            LogWrapper.checkLogLevel(logLevel, _this);
        });
        LogWrapper._wrapProtoNgOnDestroy(prototype);
    }
    LogWrapper.checkLogLevel = function (level, component) {
        var prototype = component.__proto__;
        if (level >= 4) {
            this._addToWindowStore(component);
            this._wrapComponent(component, prototype);
            this._wrapPrototype(prototype);
        }
        else {
            this._deleteFromWindowStore(component);
            this._unwrapComponent(component, prototype);
            this._unwrapPrototype(prototype);
        }
    };
    LogWrapper._addToWindowStore = function (component) {
        if (!component[WINDOW_STORE_NAME]) {
            component[WINDOW_STORE_NAME] = LogWrapper.logService.getWindowStore().add(component);
        }
    };
    LogWrapper._deleteFromWindowStore = function (component) {
        if (component[WINDOW_STORE_NAME]) {
            LogWrapper.logService.getWindowStore().delete(component[WINDOW_STORE_NAME]);
            delete component[WINDOW_STORE_NAME];
        }
    };
    LogWrapper._wrapComponent = function (component, prototype) {
        if (!component[IS_COMPONENT_WRAPPED]) {
            this._wrapComponentSubjectsAfterInit(component);
            this._wrapComponentNgOnDestroy(component, prototype);
            component[IS_COMPONENT_WRAPPED] = true;
        }
    };
    LogWrapper._unwrapComponent = function (component, prototype) {
        if (component[IS_COMPONENT_WRAPPED]) {
            this._unwrapComponentNgOnDestroy(component, prototype);
            this._unwrapComponentSubjects(component);
            component[IS_COMPONENT_WRAPPED] = false;
        }
    };
    LogWrapper._wrapPrototype = function (prototype) {
        if (!prototype[IS_PROTOTYPE_WRAPPED]) {
            LogWrapper.logService.info('Wrapping prototype ' + prototype.constructor.name);
            prototype[WRAPPED_FUNCTIONS] = {};
            for (var key in prototype) {
                if (prototype.hasOwnProperty(key)
                    && key !== 'constructor'
                    && key !== 'ngOnDestroy'
                    && key.slice(0, 2) !== '__'
                    && typeof prototype[key] === 'function') {
                    var oldFunction = prototype[key];
                    prototype[WRAPPED_FUNCTIONS][key] = oldFunction;
                    prototype[key] = this.wrappedFunction(key, prototype);
                }
            }
            prototype[IS_PROTOTYPE_WRAPPED] = true;
        }
    };
    LogWrapper.wrappedFunction = function (functionName, prototype) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var error, returnValue;
            // handle possibility of losing scope
            if (!this[WINDOW_STORE_NAME]) {
                console.error.arguments("function " + functionName + " on prototype " + prototype.constructor.name + " was executed out of scope. Consider binding the function to 'this'.");
                return;
            }
            var before = LogWrapper._cloneClean(this);
            LogWrapper.logService.groupCollapsed();
            try {
                returnValue = prototype[WRAPPED_FUNCTIONS][functionName].bind(this).apply(void 0, args);
            }
            catch (e) {
                error = e;
            }
            var endTime = performance.now();
            LogWrapper.logService.log('  Args:', args);
            var numberOfDiffs = LogWrapper._logDiffs(before, this);
            if (error) {
                LogWrapper.logService.error(error);
            }
            else {
                LogWrapper.logService.log('Return:', returnValue);
            }
            var logString = this._getHeaderName(functionName)
                + ' (changes - ' + numberOfDiffs + ')'
                + (returnValue !== undefined ? ' (return ' + LogWrapper._getTypeOfValue(returnValue) + ')' : '');
            LogWrapper.logService.groupEnd(logString, error ? _interfaces__WEBPACK_IMPORTED_MODULE_1__["LogStringEnum"].ERROR : _interfaces__WEBPACK_IMPORTED_MODULE_1__["LogStringEnum"].LOG, endTime);
            if (!error) {
                return returnValue;
            }
        };
    };
    LogWrapper._logDiffs = function (before, current) {
        var after = LogWrapper._cloneClean(current);
        var keysWithStateChanges = LogWrapper._getKeysWithStateChanges(before, after);
        if (keysWithStateChanges.length) {
            var beforeObj = LogWrapper._getSubsetOfObjectByKeys(before, keysWithStateChanges);
            var afterObj = LogWrapper._getSubsetOfObjectByKeys(after, keysWithStateChanges);
            LogWrapper.logService.log('Before:', beforeObj);
            LogWrapper.logService.log(' After:', afterObj);
        }
        return keysWithStateChanges.length;
    };
    LogWrapper.prototype._getHeaderName = function (key) {
        return this.constructor.name + ' ' + key;
    };
    LogWrapper._unwrapPrototype = function (prototype) {
        if (prototype[IS_PROTOTYPE_WRAPPED]) {
            var wrappedFunctions = prototype[WRAPPED_FUNCTIONS];
            for (var key in wrappedFunctions) {
                if (wrappedFunctions.hasOwnProperty(key)) {
                    prototype[key] = wrappedFunctions[key];
                }
            }
            prototype[WRAPPED_FUNCTIONS] = {};
            prototype[IS_PROTOTYPE_WRAPPED] = false;
        }
    };
    LogWrapper._getKeysWithStateChanges = function (obj1, obj2) {
        var diffs = [];
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEqual"])(obj1[key], obj2[key]))
                    diffs.push(key);
            }
        }
        return diffs;
    };
    LogWrapper._getSubsetOfObjectByKeys = function (obj, keys) {
        var subsetOfObj = {};
        for (var i = 0; i < keys.length; i++) {
            subsetOfObj[keys[i]] = obj[keys[i]];
        }
        return subsetOfObj;
    };
    LogWrapper._cloneClean = function (obj) {
        var clone = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                if (element === undefined
                    || element === null
                    || (element.constructor.name.slice(element.constructor.name.length - 7) !== 'Service'
                        && !INVALID_KEYS.has(element.constructor.name)
                        && !LogWrapper._hasFunction(element))) {
                    clone[key] = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(element);
                }
            }
        }
        return clone;
    };
    LogWrapper._hasFunction = function (obj) {
        if (typeof obj === 'function') {
            return true;
        }
        if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'function') {
                    return true;
                }
            }
        }
        return false;
    };
    LogWrapper._wrapComponentSubjectsAfterInit = function (component) {
        var _this = this;
        setTimeout(function () {
            var _loop_1 = function (key) {
                if (component.hasOwnProperty(key)) {
                    var element = component[key];
                    if (_this._isSubject(element)) {
                        var sub = element.subscribe(function (data) {
                            LogWrapper.logService.groupCollapsed(component._getHeaderName(key) + ' (next)' + (data !== undefined ? ', (new data)' : ''), _interfaces__WEBPACK_IMPORTED_MODULE_1__["LogStringEnum"].TIMESTAMP);
                            LogWrapper.logService.log('Args: ', data);
                            LogWrapper.logService.groupEnd();
                        });
                        component[SUBJECTS].push(sub);
                    }
                }
            };
            for (var key in component) {
                _loop_1(key);
            }
        }, 0);
    };
    LogWrapper._unwrapComponentSubjects = function (component) {
        if (component[SUBJECTS] && component[SUBJECTS].length) {
            for (var i = 0; i < component[SUBJECTS].length; i++) {
                var sub = component[SUBJECTS][i];
                sub.unsubscribe();
            }
        }
        component[SUBJECTS] = [];
    };
    // hook onto ngOnDestroy to unsub from logLevelSub
    LogWrapper._wrapProtoNgOnDestroy = function (prototype) {
        // hook onto proto destroy
        if (prototype[IS_DESTROY_WRAPPED]) {
            return;
        }
        if (prototype.ngOnDestroy) {
            prototype[IS_DESTROY_WRAPPED] = true;
            var oldDestroy = prototype.ngOnDestroy;
            prototype[NG_ON_DESTROY] = oldDestroy;
            prototype.ngOnDestroy = function () {
                this[LOG_LEVEL_SUB].unsubscribe();
                prototype[NG_ON_DESTROY].apply(this);
            };
        }
    };
    LogWrapper._wrapComponentNgOnDestroy = function (component, prototype) {
        if (prototype.ngOnDestroy) {
            component.ngOnDestroy = function () {
                LogWrapper.logService.getWindowStore().delete(this[WINDOW_STORE_NAME]);
                prototype.ngOnDestroy.apply(this);
            };
        }
    };
    LogWrapper._unwrapComponentNgOnDestroy = function (component, prototype) {
        if (prototype.ngOnDestroy && component.hasOwnProperty('ngOnDestroy')) {
            delete component.ngOnDestroy;
        }
    };
    LogWrapper._isSubject = function (element) {
        return element && element.constructor && element.constructor.name === 'Subject';
    };
    LogWrapper._getTypeOfValue = function (element) {
        if (element && element.constructor && element.constructor.name) {
            return element.constructor.name;
        }
        else {
            return typeof element;
        }
    };
    return LogWrapper;
}());

_a = SUBJECTS, _b = IS_COMPONENT_WRAPPED;


/***/ }),

/***/ "./src/app/logger/log.service.ts":
/*!***************************************!*\
  !*** ./src/app/logger/log.service.ts ***!
  \***************************************/
/*! exports provided: LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "./src/app/logger/interfaces.ts");
/* harmony import */ var _log_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log-queue */ "./src/app/logger/log-queue.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _window_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./window-store */ "./src/app/logger/window-store.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ActivatedRoute } from '@angular/router';



var DEFAULT_LOG_LEVEL = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production ? -1 : 4;
var LogService = /** @class */ (function () {
    function LogService(
    // private route: ActivatedRoute
    ) {
        this.logLevelSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.windowStore = new _window_store__WEBPACK_IMPORTED_MODULE_6__["WindowStore"]();
        this.logQueue = new _log_queue__WEBPACK_IMPORTED_MODULE_1__["LogQueue"]();
        // private readonly filteredLocations: Set<string> = new Set(['LogService', 'Subscriber', 'TapSubscriber', 'MapSubscriber', 'SafeSubscriber', 'Observable', 'Array', 'Object', 'LogQueue']);
        this.logLevel = _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"].LOG;
        this.groupCounter = 0;
        this.STYLE = {
            INFO: 'color: #40ad45; font-weight: 700;',
            ERROR: 'color: #f24b4b; font-weight: 700;',
            LOG: 'font-weight: 400;',
            TIMESTAMP: 'color: #888; font-weight: 400;',
            WARN: 'color: orange; font-weight: 700;',
        };
        this.isIe = this._isIe();
        this.isTest = !!window.__karma__;
        this.logLevel = DEFAULT_LOG_LEVEL;
        if (this.isIe || this.isTest) {
            this.logLevel = _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"].NOLOG;
        }
        // if (this.route.snapshot.queryParams.logLevel) {
        //   this.logLevel = +this.route.snapshot.queryParams.logLevel;
        // }
        // this.route.queryParams.subscribe(params => {
        //   if (params.logLevel) {
        //     this.setLogLevel(+params.logLevel);
        //   }
        // });
        this.setLogLevel(this.logLevel);
    }
    /**
     * Wrapper for console.log(). Requires logLevel <= 3
     */
    LogService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._queueItem.apply(this, [_interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].LOG].concat(args));
    };
    /**
     * Wrapper for console.log(). Requires logLevel <= 3
     */
    LogService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._queueItem.apply(this, [_interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].INFO].concat(args));
    };
    /**
     * Wrapper for console.log(). Requires logLevel <= 3
     */
    LogService.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._queueItem.apply(this, [_interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].WARN].concat(args));
    };
    /**
     * Wrapper for console.log(). Requires logLevel <= 3
     */
    LogService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._queueItem.apply(this, [_interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].ERROR].concat(args));
    };
    /** Wrapper for console.group(). Starts a new uncollapsed group to be logged
     * @param header - header of group
     * @param logLevel - logLevel ranging from NOLOG (-1) to VERBOSE (4). Default is LOG(3). Gorups will be hidden if they and their children's log levels are below the threshold
     */
    LogService.prototype.group = function (header, logLevel) {
        this.logQueue.makeGroup(header || '', logLevel || _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].LOG, false);
    };
    /** Wrapper for console.group(). Starts a new uncollapsed group to be logged
     * @param header - header of group
     * @param logLevel - logLevel ranging from NOLOG (-1) to VERBOSE (4). Default is LOG(3). Gorups will be hidden if they and their children's log levels are below the threshold
     */
    LogService.prototype.groupCollapsed = function (header, logLevel) {
        this.logQueue.makeGroup(header || '', logLevel || _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogStringEnum"].LOG, true);
    };
    LogService.prototype.groupEnd = function (header, logLevel, performanceNow) {
        var _this = this;
        this.logQueue.endGroup(header, logLevel, performanceNow);
        if (this.logQueue.areAllGroupsEnded()) {
            this.logQueue.forEach(function (logGroup) {
                _this._logGroup(logGroup);
            });
            this.logQueue.clearQueue();
        }
    };
    LogService.prototype.setLogLevel = function (level) {
        if ([-1, 0, 1, 2, 3, 4].includes(level)) {
            this.logLevel = level;
        }
        else {
            this.logLevel = _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"].WARN;
        }
        if (!this.isTest) {
            !this.isIe
                ? console.warn('%cLog level is now ' + this.logLevel, this.STYLE.ERROR)
                : console.warn('Log level is now ' + this.logLevel);
        }
        this.logLevelSubject.next(this.logLevel);
    };
    LogService.prototype.getLogLevel = function () {
        return this.logLevel;
    };
    LogService.prototype.getLogLevelSubject = function () {
        return this.logLevelSubject;
    };
    LogService.prototype.getWindowStore = function () {
        return this.windowStore;
    };
    LogService.prototype._logItem = function (level, isGrouped, args) {
        if (this.logLevel >= _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"][level]) {
            this._groupBasedOnTime();
            if (isGrouped) {
                !this.isIe
                    ? console.group('%c' + args[0] + '%c - ' + this._getLogDateTimeString(), this.STYLE[level], this.STYLE.TIMESTAMP)
                    : console.group(args[0] + ' - ' + this._getLogDateTimeString());
                for (var i = 0; i < args.length; i++) {
                    var element = args[i];
                    console[level.toLocaleLowerCase()](element);
                }
                console.groupEnd();
            }
            else {
                if (level.toLocaleLowerCase() === 'info') {
                    !this.isIe
                        ? console.log.apply(console, ['%c' + args[0], this.STYLE[level]].concat(args.slice(1))) : console.log.apply(console, args);
                }
                else {
                    console[level.toLocaleLowerCase()].apply(console, args);
                }
            }
        }
    };
    LogService.prototype._queueItem = function (level) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.logQueue.isQueueEmpty() || !this.logQueue.isMostRecentItemGrouped()) {
            var isGrouped = args.length > 1;
            this._logItem(level, isGrouped, args);
        }
        else {
            this.logQueue.addToCurrentGroup(level, args);
        }
    };
    LogService.prototype._logGroup = function (group) {
        var _this = this;
        var action = group.style;
        if (this.logLevel > _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"][action] || this._isGroupLoggable(group)) {
            this._groupBasedOnTime();
            var consoleGroup = group.isCollapsed ? console.groupCollapsed : console.group;
            var timeDiff = Math.round((group.endTime - group.startTime) * 10) / 10;
            var timeString = this._getLogDateTimeString(group.startDate) + ' (' + timeDiff + ' ms)';
            !this.isIe
                ? consoleGroup('%c' + group.logQueueHeader + '%c - ' + timeString, this.STYLE[group.style], this.STYLE.TIMESTAMP)
                : consoleGroup(group.logQueueHeader + ' - ' + timeString);
            group.logQueue.forEach(function (item) {
                _this._logItem(item.level, false, item.args);
            });
            console.groupEnd();
        }
    };
    LogService.prototype._isGroupLoggable = function (group) {
        for (var i = 0; i < group.logQueue.length; i++) {
            var itemAction = group.logQueue[i][0];
            if (this.logLevel >= _interfaces__WEBPACK_IMPORTED_MODULE_0__["LogLevelEnum"][itemAction]) {
                return true;
            }
        }
        return false;
    };
    LogService.prototype._getLogDateTimeString = function (date) {
        return Object(date_fns__WEBPACK_IMPORTED_MODULE_4__["format"])(date ? date : new Date(), 'HH:mm:ss.SSS');
    };
    LogService.prototype._groupBasedOnTime = function () {
        var now = new Date();
        var ms = now.getTime();
        if (!this.mostRecentLog || this.mostRecentLog + 200 < ms) {
            console.groupEnd();
            this.groupCounter++;
            !this.isIe
                ? console.group('[  ' + this.groupCounter + '  ]' + '%c' + this._getLogDateTimeString(now), this.STYLE.TIMESTAMP)
                : console.group('[  ' + this.groupCounter + '  ]' + this._getLogDateTimeString(now));
            clearTimeout(this.groupTimeout);
        }
        this.mostRecentLog = ms;
    };
    LogService.prototype._isIe = function () {
        var ua = window.navigator.userAgent;
        return ~ua.indexOf('MSIE ') || ~ua.indexOf('Trident/') ? true : false;
    };
    LogService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "./src/app/logger/window-store.ts":
/*!****************************************!*\
  !*** ./src/app/logger/window-store.ts ***!
  \****************************************/
/*! exports provided: WindowStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowStore", function() { return WindowStore; });
var WindowStore = /** @class */ (function () {
    function WindowStore() {
        this.store = {};
        if (!window.hasOwnProperty('s')) {
            window.s = {};
        }
        this.store = window.s;
    }
    /** Adds the component to the window
     * @param component - object to add to the window
     * @return thekey in the store that maps to the component
     */
    WindowStore.prototype.add = function (component) {
        return this._add(component);
    };
    WindowStore.prototype.delete = function (componentName) {
        this._delete(componentName);
    };
    WindowStore.prototype._has = function (componentName) {
        return this.store.hasOwnProperty(componentName);
    };
    WindowStore.prototype._add = function (component) {
        var name = this._getComponentName(component);
        this.store[name] = component;
        return name;
    };
    WindowStore.prototype._delete = function (componentName) {
        delete this.store[componentName];
    };
    WindowStore.prototype._getComponentName = function (component) {
        var componentName = component.constructor.name;
        if (!this._has(componentName)) {
            return componentName;
        }
        for (var i = 0; i < 99; i++) {
            if (!this._has(componentName + i)) {
                return componentName + i;
            }
        }
        // this will start returning a constant string after there are more than 100 instances of a component
        // in the window store. this is to prevent whatever bizarre memory leak you're trying to
        // induce by having more than 100 components.
        return "MAX_COMPONENTS_NAME";
    };
    return WindowStore;
}());



/***/ }),

/***/ "./src/app/services/git-api.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/git-api.service.ts ***!
  \*********************************************/
/*! exports provided: GitApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitApiService", function() { return GitApiService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar-content.service */ "./src/app/services/sidebar-content.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var base_64__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");
/* harmony import */ var base_64__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(base_64__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../logger/log.service */ "./src/app/logger/log.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var VALID_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
var GitApiService = /** @class */ (function () {
    function GitApiService(logService, http, sidebarContentService) {
        var _this = this;
        this.logService = logService;
        this.http = http;
        this.sidebarContentService = sidebarContentService;
        this.paramsChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
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
        this.graphChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
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
    GitApiService.prototype.ngOnDestroy = function () { };
    GitApiService.prototype.getParamsChange = function () {
        return this.paramsChange;
    };
    GitApiService.prototype.getGraphChange = function () {
        return this.graphChange;
    };
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
            headers: { 'Authorization': 'Basic aGFuaGVlLXNvbmc6ZjVlMzE3YWMxYWMwMDg1Njg5MDI0OWI5ODZiY2I0OTBiOGNhNzRmZA==' },
        });
    };
    GitApiService.prototype._processRepoResponse = function (response) {
        var _this = this;
        this._.sha = response[0].sha;
        this._getSha().subscribe(function (response) { return _this._processShaResponse(response); }, function (error) {
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
        this._setMessage();
        var observables = [];
        var _loop_1 = function (i) {
            var file = this_1._.files[i];
            observables.push(this_1._getFile(file.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) { return _this._processFile(file.path, res); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) { return _this._handleFileError(); })));
        };
        var this_1 = this;
        for (var i = 0; i < this._.files.length; i++) {
            _loop_1(i);
        }
        rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"].apply(void 0, observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(1500))
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
                totalFiles: _this.graphJSON.nodes.length,
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
        var content = Object(base_64__WEBPACK_IMPORTED_MODULE_5__["decode"])(res.content);
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
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
        return !!parsedName.match(/((bundle).*\.(js))/)
            || !!parsedName.match(/((webpack).*\.(config))/)
            || !VALID_EXTENSIONS.includes(ext)
            || VALID_EXTENSIONS.includes(path); // will otherwise break when folders are named js
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
        else {
            for (var i = 0; i < VALID_EXTENSIONS.length; i++) {
                var ext = '.' + VALID_EXTENSIONS[i];
                if (this._.filePathSet.has(combinedPath + ext)) {
                    return combinedPath + ext;
                }
            }
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_6__["LogService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _sidebar_content_service__WEBPACK_IMPORTED_MODULE_1__["SidebarContentService"]])
    ], GitApiService);
    return GitApiService;
}());



/***/ }),

/***/ "./src/app/services/modal.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/modal.service.ts ***!
  \*******************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _logger_log_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger/log-wrapper */ "./src/app/logger/log-wrapper.ts");
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/log.service */ "./src/app/logger/log.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalService = /** @class */ (function (_super) {
    __extends(ModalService, _super);
    function ModalService(logService) {
        var _this = _super.call(this, logService) || this;
        _this.logService = logService;
        _this.modal = "help";
        _this.modalChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        _this.modalChange.subscribe(function (modal) { return _this.modal = modal; });
        return _this;
    }
    ModalService.prototype.ngOnDestroy = function () { };
    ModalService.prototype.closeModal = function () {
        this.modalChange.next("");
    };
    ModalService.prototype.openModal = function (modal) {
        this.modalChange.next(modal);
    };
    ModalService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_3__["LogService"]])
    ], ModalService);
    return ModalService;
}(_logger_log_wrapper__WEBPACK_IMPORTED_MODULE_2__["LogWrapper"]));



/***/ }),

/***/ "./src/app/services/sidebar-content.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/sidebar-content.service.ts ***!
  \*****************************************************/
/*! exports provided: SidebarContentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarContentService", function() { return SidebarContentService; });
/* harmony import */ var _logger_log_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../logger/log.service */ "./src/app/logger/log.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _logger_log_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/log-wrapper */ "./src/app/logger/log-wrapper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidebarContentService = /** @class */ (function (_super) {
    __extends(SidebarContentService, _super);
    function SidebarContentService(logService) {
        var _this = _super.call(this, logService) || this;
        _this.logService = logService;
        _this.content = "";
        _this.data = {
            totalLines: 0,
            totalFiles: 0,
            currentFile: "",
            currentLoc: "",
        };
        _this.contentChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        _this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        _this.contentChange.subscribe(function (val) { return _this.content = val; });
        _this.dataChange.subscribe(function (data) { return _this.data = Object.assign(_this.data, data); });
        return _this;
    }
    SidebarContentService.prototype.ngOnDestroy = function () { };
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_logger_log_service__WEBPACK_IMPORTED_MODULE_0__["LogService"]])
    ], SidebarContentService);
    return SidebarContentService;
}(_logger_log_wrapper__WEBPACK_IMPORTED_MODULE_3__["LogWrapper"]));



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Hanhee\Code\github-visualizer\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map