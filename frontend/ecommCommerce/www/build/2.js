webpackJsonp([2],{

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesAddPageModule", function() { return ServicesAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_add__ = __webpack_require__(918);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServicesAddPageModule = /** @class */ (function () {
    function ServicesAddPageModule() {
    }
    ServicesAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__services_add__["a" /* ServicesAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__services_add__["a" /* ServicesAddPage */]),
            ],
        })
    ], ServicesAddPageModule);
    return ServicesAddPageModule;
}());

//# sourceMappingURL=services-add.module.js.map

/***/ }),

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_service_service_service_service__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_globals_service_globals_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_service_class__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_service_authentication_service__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ServicesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServicesAddPage = /** @class */ (function () {
    function ServicesAddPage(navCtrl, navParams, authService, viewCtrl, alertCtrl, serviceService, globalService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.serviceService = serviceService;
        this.globalService = globalService;
        this.averageTime = 0;
        this.accion = 'Adicionar';
        this.service = new __WEBPACK_IMPORTED_MODULE_4__classes_service_class__["a" /* ServiceClass */]();
        if (this.navParams.get('service')) {
            this.service = this.navParams.get('service');
            this.accion = 'Actualizar';
        }
    }
    ServicesAddPage.prototype.ionViewCanEnter = function () {
        return this.authService.isAuthenticated();
    };
    ServicesAddPage.prototype.ngOnInit = function () {
        this.loggedUser = this.globalService.getLoggedProffessionalData();
        console.log('usuario:' + JSON.stringify(this.loggedUser));
    };
    ServicesAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServicesAddPage');
    };
    ServicesAddPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    ServicesAddPage.prototype.save = function () {
        console.log('Servicio a Salvar:' + JSON.stringify(this.service));
        if (!this.service.name || !this.service.averageTime) {
            var theAlert = this.alertCtrl.create({
                title: "Campos incompletos",
                subTitle: "Favor ingresar los datos obligatorios",
                buttons: ['OK']
            });
            theAlert.present();
        }
        else {
            this.viewCtrl.dismiss(this.service);
        }
    };
    ServicesAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-services-add',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/services-add/services-add.html"*/'<!--\n  Generated template for the ServicesAddPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n    <ion-title>{{accion | titlecase}} Servicio</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label >Título (*)</ion-label>\n      <ion-input  type="text" placeholder="Limpieza" [(ngModel)] = "service.name" id="name" name="name" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Descripción</ion-label>\n      <ion-input  type="text" [(ngModel)] = "service.description" id="description" name="name">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Duración en Minutos (*)</ion-label>\n      <ion-input  type="number" placeholder="minutos" [(ngModel)]="service.averageTime" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-range min="1" max="240" [(ngModel)]="service.averageTime" color="secondary">\n        <ion-label range-left>0</ion-label>\n        <ion-label range-right>240</ion-label>\n      </ion-range>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Campos obligatorios (*)</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n  <ion-buttons >\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon>{{accion}}\n    </button>\n    <!--button ion-button full icon-left color="danger" (click)="save()" *ngIf="accion == \'Actualizar\'">\n      Eliminar\n    </button-->\n  </ion-buttons>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/services-add/services-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_service_service_service_service__["a" /* ServiceServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], ServicesAddPage);
    return ServicesAddPage;
}());

//# sourceMappingURL=services-add.js.map

/***/ })

});
//# sourceMappingURL=2.js.map