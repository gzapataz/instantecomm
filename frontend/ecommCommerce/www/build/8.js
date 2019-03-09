webpackJsonp([8],{

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDetailPageModule", function() { return CustomerDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_detail__ = __webpack_require__(911);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerDetailPageModule = /** @class */ (function () {
    function CustomerDetailPageModule() {
    }
    CustomerDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__customer_detail__["a" /* CustomerDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_detail__["a" /* CustomerDetailPage */]),
            ],
        })
    ], CustomerDetailPageModule);
    return CustomerDetailPageModule;
}());

//# sourceMappingURL=customer-detail.module.js.map

/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_customer_update_detail_customer_update_detail__ = __webpack_require__(512);
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
var CustomerDetailPage = /** @class */ (function () {
    function CustomerDetailPage(navCtrl, navParams, viewCtrl, customerUpdateDetailProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.customerUpdateDetailProvider = customerUpdateDetailProvider;
        this.persona = {
            _id: '',
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
            address: ''
        };
        this.customer = this.navParams.get('customer');
        this.profesionalID = this.navParams.get('profesionalID');
        console.log('Detail:' + JSON.stringify(this.customer) + this.profesionalID);
        if (this.customer != undefined) {
        }
    }
    CustomerDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerDetailPage');
    };
    CustomerDetailPage.prototype.ngOnInit = function () {
    };
    CustomerDetailPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    CustomerDetailPage.prototype.delete = function () {
        var _this = this;
        this.customerUpdateDetailProvider.deleteCustomer(this.customer, this.profesionalID).subscribe(function (data) {
            console.log('Datos Eliminados:' + JSON.stringify(data));
            _this.cancel();
        });
    };
    CustomerDetailPage.prototype.save = function () {
        var _this = this;
        // @ts-ignore
        this.person = this.persona;
        this.person._id = this.customer._id;
        this.person.personName.firstName = this.customer.person.personName.firstName;
        this.person.personName.lastName = this.customer.person.personName.lastName;
        this.person.idType = this.customer.person.idType;
        this.person.identification = this.customer.person.identification;
        this.person.gender = this.customer.person.gender;
        this.person.phone = this.customer.person.phone;
        this.person.mobile = this.customer.person.mobile;
        this.person.email = this.customer.person.email;
        this.person.address = this.customer.person.address;
        this.customerUpdateDetailProvider.updateCustomer(this.person, this.profesionalID).subscribe(function (data) {
            console.log('Datos Salvados:' + JSON.stringify(data));
            _this.cancel();
        });
    };
    CustomerDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-detail',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-detail/customer-detail.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>Información de contacto</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label >Nombre del paciente: </ion-label>\n    <ion-input  type="text" id="name"[(ngModel)]="customer.person.personName.firstName" name="name" required="required" >\n    </ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label >Apellido del paciente: </ion-label>\n    <ion-input  type="text" id="lastname"[(ngModel)]="customer.person.personName.lastName" name="lastname" required="required" >\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Tipo de identificacion:  </ion-label>\n    <ion-input  type="text" id="idType"[(ngModel)]="customer.person.idType" name="idType" >\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Numero  de identificacion:  </ion-label>\n    <ion-input  type="number" id="identification"[(ngModel)]="customer.person.identification" name="identification" >\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Telefono fijo: </ion-label>\n    <ion-input  type="tel" id="phone"[(ngModel)]="customer.person.phone" name="phone">\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Telefono celular: </ion-label>\n\n    <ion-input  type="tel" id="mobile"[(ngModel)]="customer.person.mobile" name="mobile" required="required" >\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Correo electronico: </ion-label>\n    <ion-input  type="email" id="email"[(ngModel)]="customer.person.email" name="email">\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>Direccion </ion-label>\n    <ion-input  type="text" placeholder="Baker street" id="address"[(ngModel)]="customer.person.address" name="address">\n    </ion-input>\n  </ion-item>\n  <ion-buttons >\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon> Actualizar\n    </button>\n    <!--button ion-button full icon-left color="danger" (click)="delete()">\n      Eliminar\n    </button-->\n  </ion-buttons>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-detail/customer-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_customer_update_detail_customer_update_detail__["a" /* CustomerUpdateDetailProvider */]])
    ], CustomerDetailPage);
    return CustomerDetailPage;
}());

//# sourceMappingURL=customer-detail.js.map

/***/ })

});
//# sourceMappingURL=8.js.map