webpackJsonp([6],{

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerWhatsappPageModule", function() { return CustomerWhatsappPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_whatsapp__ = __webpack_require__(911);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerWhatsappPageModule = /** @class */ (function () {
    function CustomerWhatsappPageModule() {
    }
    CustomerWhatsappPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__customer_whatsapp__["a" /* CustomerWhatsappPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_whatsapp__["a" /* CustomerWhatsappPage */]),
            ],
        })
    ], CustomerWhatsappPageModule);
    return CustomerWhatsappPageModule;
}());

//# sourceMappingURL=customer-whatsapp.module.js.map

/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerWhatsappPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globals_service_globals_service__ = __webpack_require__(37);
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
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerWhatsappPage = /** @class */ (function () {
    function CustomerWhatsappPage(navCtrl, navParams, viewCtrl, globalService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.globalService = globalService;
        this.vcard = {
            name: {
                firstNames: 'John',
                lastNames: 'Doe'
            }
        };
        this.mobile = this.navParams.get('mobile');
        this.customer = this.navParams.get('customer');
        this.professional = this.navParams.get('professional');
        console.log('this.mobile:' + this.mobile);
        console.log('this.customer:' + JSON.stringify(this.customer));
        console.log('this.professional:' + this.professional);
    }
    CustomerWhatsappPage.prototype.ionViewDidLoad = function () {
    };
    CustomerWhatsappPage.prototype.ngOnInit = function () {
        this.textData = 'Buenas+tardes+Sr%28a%29%3A+' + this.customer['firstName'] + '%2C+este+mensaje+es+enviado+desde+el+consultorio+del+%28la%29+Dr%28a%29%3A+' + this.professional + '.++Por+este+medio+le+recordaremos+oportunamente+sus+citas+y%2Fo+procedimientos+programados.++Con+el+fin+de+activar+el+servicio%2C+por+favor+presione+sobre+el+siguiente+texto+en+azul%3A+https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido';
    };
    CustomerWhatsappPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    CustomerWhatsappPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-whatsapp',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-whatsapp/customer-whatsapp.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>Paciente creado</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <p>Los pacientes que prefieren notificacion por WhatsApp deben autorizar los mensajes del centro de comunicaciones de la aplicacion.\n    Por tal motivo se les debe enviar el mensaje siguiente por whatsapp</p>\n    <ion-label>Es necesario enviar este link</ion-label>\n  <!--ion-buttons >\n    <button ion-button color="secondary" small (click)="sendSms()">SMS</button>\n  </ion-buttons-->\n\n  <ion-buttons >\n    <button ion-button color="secondary" small><a href="https://wa.me/{{mobile}}?text={{textData}}">Enviar</a></button>\n  </ion-buttons>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-whatsapp/customer-whatsapp.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], CustomerWhatsappPage);
    return CustomerWhatsappPage;
}());

//# sourceMappingURL=customer-whatsapp.js.map

/***/ })

});
//# sourceMappingURL=6.js.map