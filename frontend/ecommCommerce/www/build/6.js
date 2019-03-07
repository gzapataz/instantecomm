webpackJsonp([6],{

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerWhatsappPageModule", function() { return CustomerWhatsappPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_whatsapp__ = __webpack_require__(905);
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

/***/ 905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerWhatsappPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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
        this.textData = 'Buenas%20tardes%20Sr(a)%3A%20' + this.customer['firstName'] + '%20' + this.customer['lastName'] + '%20este%20mensaje%20es%20enviado%20desde%20el%20consultorio%20del%20Dr(a)%3A%20' + this.professional + '%20%2C%20para%20poderlo%20tener%20al%20tanto%20de%20sus%20citas%20y%20procedimientos%20de%20inter%C3%A9s.%20Para%20poder%20activar%20el%20servicio%20por%20favor%20env%C3%ADe%20el%20mensaje%20por%20whatsapp%20con%20la%20palabra%20%22Recibido%22%20al%20n%C3%BAmero%20de%20nuestro%20servicio%20presionando%20el%20siguiente%20link%3A%20%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido';
    };
    CustomerWhatsappPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    CustomerWhatsappPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-whatsapp',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-whatsapp/customer-whatsapp.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>Paciente creado</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <ion-label>El paciente ha sido creado correctamente.<br></ion-label>\n    <ion-label>Para poder contactalo por WhatsApp el paciente<br></ion-label>\n    <ion-label>debe autorizar los mensajes.<br></ion-label>\n    <ion-label>Es necesario enviar este link</ion-label>\n  <!--ion-buttons >\n    <button ion-button color="secondary" small (click)="sendSms()">SMS</button>\n  </ion-buttons-->\n\n  <ion-buttons >\n    <button ion-button color="secondary" small><a href="https://wa.me/{{mobile}}?text={{textData}}">Enviar Acceso</a></button>\n  </ion-buttons>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-whatsapp/customer-whatsapp.html"*/,
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