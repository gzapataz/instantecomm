webpackJsonp([8],{

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerAddModalPageModule", function() { return CustomerAddModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_add_modal__ = __webpack_require__(896);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerAddModalPageModule = /** @class */ (function () {
    function CustomerAddModalPageModule() {
    }
    CustomerAddModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__customer_add_modal__["a" /* CustomerAddModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_add_modal__["a" /* CustomerAddModalPage */]),
            ],
        })
    ], CustomerAddModalPageModule);
    return CustomerAddModalPageModule;
}());

//# sourceMappingURL=customer-add-modal.module.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerAddModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_countries_service_countries_service__ = __webpack_require__(509);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerAddModalPage = /** @class */ (function () {
    function CustomerAddModalPage(navCtrl, navParams, viewCtrl, customerAddServiceProvider, alertCtrl, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.customerAddServiceProvider = customerAddServiceProvider;
        this.alertCtrl = alertCtrl;
        this.rest = rest;
        this.persona = {
            personName: {
                firstName: '',
                lastName: '',
            },
            idType: "Cédula",
            birthdate: Date,
            gender: 'Femenino',
            phone: '',
            mobile: '',
            email: '',
            identification: '',
            address: ''
        };
    }
    CustomerAddModalPage.prototype.ngOnInit = function () {
        this.professional = this.navParams.get('professional');
        //  console.log(this.professional);
        this.getCountries();
        this.codigo = '57';
    };
    CustomerAddModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss(this.person);
    };
    CustomerAddModalPage.prototype.save = function () {
        var _this = this;
        // @ts-ignore
        // @ts-ignore
        this.person = this.persona;
        console.log(this.person);
        if (!this.person.personName.firstName || !this.person.personName.lastName || !this.person.mobile || !this.person.identification || !this.person.email
            || !this.person.idType) {
            var theAlert = this.alertCtrl.create({
                title: "Campos incompletos",
                subTitle: "Por favor ingresa los datos de tu paciente",
                buttons: ['OK']
            });
            theAlert.present();
        }
        else {
            if (!this.person.phone) {
                this.person.phone = "00";
            }
            else if (!this.person.address) {
                this.person.address = "baker";
            }
            this.person.mobile = this.codigo + this.persona.mobile;
            this.customerAddServiceProvider.addACustomer(this.person, this.professional.userId).subscribe(function (data) {
                console.log('Datos Salvados:' + JSON.stringify(data));
                _this.cancel();
            });
        }
    };
    CustomerAddModalPage.prototype.getCountries = function () {
        var _this = this;
        this.rest.getCountries()
            .subscribe(function (countries) { return _this.countries = countries; }, function (error) { return _this.errorMessage = error; });
    };
    CustomerAddModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-add-modal',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n    <ion-title>Agregar paciente</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label>Nombre (*)</ion-label>\n      <ion-input type="text" placeholder="Jon" id="name" [(ngModel)]="persona.personName.firstName" name="name"\n                 required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Apellido (*)</ion-label>\n      <ion-input type="text" placeholder="Doe" id="lastname" [(ngModel)]="persona.personName.lastName" name="lastname"\n                 required="required">\n      </ion-input>\n    </ion-item>\n      <ion-item>\n        <ion-label>Tipo identificacion (*)</ion-label>\n        <ion-select type="text" placeholder="idType" [(ngModel)]="persona.idType" name="idType">\n          <ion-option value="Cédula">Cédula</ion-option>\n          <ion-option value="Registro Civil">Registro Civil</ion-option>\n        </ion-select>\n      </ion-item>\n\n    <ion-item>\n      <ion-label>Numero identificacion (*)</ion-label>\n      <ion-input type="number" placeholder="123456789" id="identificacion" [(ngModel)]="persona.identification"\n                 name="identificacion">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Genero</ion-label>\n      <ion-select type="text" placeholder="Sexo" [(ngModel)]="persona.gender" name="gender">\n        <ion-option value="Femenino">Femenino</ion-option>\n        <ion-option value="Masculino">Masculino</ion-option>\n      </ion-select>\n\n    </ion-item>\n    <ion-item>\n      <ion-label>E-mail (*)</ion-label>\n      <ion-input type="email" placeholder="jon@gmail.com" id="email" [(ngModel)]="persona.email" name="email">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Pais (*)</ion-label>\n      <ion-select type="text" placeholder="Codigo"  id="code" name="code" multiple="false " [(ngModel)]="codigo" >\n        <ion-option *ngFor="let c of countries" [value] = "c.callingCodes[0]" [selected]="c.callingCodes[0] == \'57\'">{{c.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Celular (*)</ion-label>\n      <ion-input type="tel" placeholder="345123456" id="mobile" [(ngModel)]="persona.mobile" name="mobile"\n                 required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Telefono Fijo</ion-label>\n      <ion-input type="tel" placeholder="0312345" id="phone" [(ngModel)]="persona.phone" name="phone">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Direccion</ion-label>\n      <ion-input type="text" placeholder="Baker street" id="address" [(ngModel)]="persona.address" name="address">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Campos obligatorios (*)</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-buttons>\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon>\n      Adicionar\n    </button>\n  </ion-buttons>\n</ion-content>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__["a" /* CustomerAddServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__["a" /* CustomerAddServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__providers_countries_service_countries_service__["a" /* RestApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_countries_service_countries_service__["a" /* RestApiProvider */]) === "function" && _f || Object])
    ], CustomerAddModalPage);
    return CustomerAddModalPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=customer-add-modal.js.map

/***/ })

});
//# sourceMappingURL=8.js.map