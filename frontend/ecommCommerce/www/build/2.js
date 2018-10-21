webpackJsonp([2],{

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollHomePageModule", function() { return ScrollHomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scroll_home__ = __webpack_require__(904);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScrollHomePageModule = /** @class */ (function () {
    function ScrollHomePageModule() {
    }
    ScrollHomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scroll_home__["a" /* ScrollHomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scroll_home__["a" /* ScrollHomePage */]),
            ],
        })
    ], ScrollHomePageModule);
    return ScrollHomePageModule;
}());

//# sourceMappingURL=scroll-home.module.js.map

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { mobiscroll, MbscCalendarOptions } from '@mobiscroll/angular';
/*
mobiscroll.settings = {
  theme: 'ios'
};
*/
/**
 * Generated class for the ScrollCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScrollHomePage = /** @class */ (function () {
    function ScrollHomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ScrollHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScrollHomePage');
    };
    ScrollHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scroll-home',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/scroll-home/scroll-home.html"*/'<!--\n  Generated template for the ScrollCalendarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ScrollHome</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <!--mbsc-form>\n    <div class="mbsc-form-group">\n      <div class="mbsc-form-group-title">Multiple date selection</div>\n      <label>\n        Multi-day\n        <input [(ngModel)]="demo" mbsc-calendar [mbsc-options]="demoSettings" placeholder="Please select..." />\n      </label>\n      <label>\n        Max days\n        <input [(ngModel)]="max" mbsc-calendar [mbsc-options]="maxSettings" placeholder="Please select..." />\n      </label>\n      <label>\n        Counter\n        <input [(ngModel)]="count" mbsc-calendar [mbsc-options]="countSettings" placeholder="Please select..." />\n      </label>\n    </div>\n  </mbsc-form-->\n</ion-content>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/scroll-home/scroll-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ScrollHomePage);
    return ScrollHomePage;
}());

//# sourceMappingURL=scroll-home.js.map

/***/ })

});
//# sourceMappingURL=2.js.map