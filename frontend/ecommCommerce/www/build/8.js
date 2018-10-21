webpackJsonp([8],{

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerAddModalPageModule", function() { return CustomerAddModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__ = __webpack_require__(506);
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
    function CustomerAddModalPage(navCtrl, navParams, viewCtrl, customerAddServiceProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.customerAddServiceProvider = customerAddServiceProvider;
        this.alertCtrl = alertCtrl;
        this.persona = {
            personName: {
                firstName: '',
                lastName: '',
            },
            idType: "Cédula",
            birthdate: Date,
            gender: '',
            phone: '',
            mobile: '',
            email: '',
            identification: '',
        };
        this.professional = this.navParams.get('professional');
        console.log(this.professional);
    }
    CustomerAddModalPage.prototype.ngOnInit = function () {
        console.log('Me volvi a disparar');
    };
    CustomerAddModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss(this.person);
    };
    CustomerAddModalPage.prototype.save = function () {
        var _this = this;
        // @ts-ignore
        this.person = this.persona;
        console.log(this.person);
        if (!this.person.personName.firstName || !this.person.personName.lastName || !this.person.gender || !this.person.email || !this.person.mobile) {
            var theAlert = this.alertCtrl.create({
                title: "Campos incompletos",
                subTitle: "Por favor ingresa los datos de tu paciente",
                buttons: ['OK']
            });
            theAlert.present();
        }
        else {
            this.customerAddServiceProvider.addACustomer(this.person, this.professional.userId).subscribe(function (data) {
                console.log('Datos Salvados:' + JSON.stringify(data));
                /*let theAlert = this.alertCtrl.create({
                  title: "Creacion de cliente",
                  subTitle: JSON.stringify(data),
                  buttons: ['OK']
                });
                theAlert.present();*/
                _this.cancel();
            });
        }
    };
    CustomerAddModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-add-modal',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n    <ion-title>Agregar paciente</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label >Nombre (*)</ion-label>\n      <ion-input  type="text" placeholder="Jon" id="name"[(ngModel)]="persona.personName.firstName" name="name" required="required">\n    </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Apellido (*)</ion-label>\n      <ion-input  type="text" placeholder="Doe" id="lastname" [(ngModel)]="persona.personName.lastName" name="lastname" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Numero identificacion</ion-label>\n      <ion-input  type="number" placeholder="123456789" id="identificacion" [(ngModel)]="persona.identification" name="identificacion">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Genero (*)</ion-label>\n      <ion-select  type="text" placeholder="Sexo"  [(ngModel)]="persona.gender" name="gender" required="required">\n        <ion-option   value="Femenino">Femenino</ion-option>\n        <ion-option   value="Masculino">Masculino</ion-option>\n      </ion-select>\n\n    </ion-item>\n    <ion-item>\n      <ion-label >E-mail (*)</ion-label>\n      <ion-input  type="email" placeholder="jon@gmail.com" id="email" [(ngModel)]="persona.email" name="email" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label >Celular (*)</ion-label>\n      <ion-input  type="number" placeholder="345123456" id="mobile" [(ngModel)]="persona.mobile" name="mobile" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Telefono Fijo </ion-label>\n      <ion-input  type="number" placeholder="0312345" id="phone"[(ngModel)]="persona.phone" name="phone" required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Campos obligatorios (*)</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n  <ion-buttons >\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon> Adicionar\n    </button>\n  </ion-buttons>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__["a" /* CustomerAddServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], CustomerAddModalPage);
    return CustomerAddModalPage;
}());

//# sourceMappingURL=customer-add-modal.js.map

/***/ })

});
//# sourceMappingURL=8.js.map