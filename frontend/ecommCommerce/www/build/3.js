webpackJsonp([3],{

/***/ 891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollCalendarPageModule", function() { return ScrollCalendarPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scroll_calendar__ = __webpack_require__(903);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScrollCalendarPageModule = /** @class */ (function () {
    function ScrollCalendarPageModule() {
    }
    ScrollCalendarPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scroll_calendar__["a" /* ScrollCalendarPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scroll_calendar__["a" /* ScrollCalendarPage */]),
            ],
        })
    ], ScrollCalendarPageModule);
    return ScrollCalendarPageModule;
}());

//# sourceMappingURL=scroll-calendar.module.js.map

/***/ }),

/***/ 903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollCalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
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
var ScrollCalendarPage = /** @class */ (function () {
    function ScrollCalendarPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ScrollCalendarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScrollCalendarPage');
    };
    ScrollCalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scroll-calendar',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/scroll-calendar/scroll-calendar.html"*/'<!--\n  Generated template for the ScrollCalendarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ScrollCalendar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <!--mbsc-form>\n    <div class="mbsc-form-group">\n      <div class="mbsc-form-group-title">Multiple date selection</div>\n      <label>\n        Multi-day\n        <input [(ngModel)]="demo" mbsc-calendar [mbsc-options]="demoSettings" placeholder="Please select..." />\n      </label>\n      <label>\n        Max days\n        <input [(ngModel)]="max" mbsc-calendar [mbsc-options]="maxSettings" placeholder="Please select..." />\n      </label>\n      <label>\n        Counter\n        <input [(ngModel)]="count" mbsc-calendar [mbsc-options]="countSettings" placeholder="Please select..." />\n      </label>\n    </div>\n  </mbsc-form-->\n</ion-content>\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/scroll-calendar/scroll-calendar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ScrollCalendarPage);
    return ScrollCalendarPage;
}());

//# sourceMappingURL=scroll-calendar.js.map

/***/ })

});
//# sourceMappingURL=3.js.map