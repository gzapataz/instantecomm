webpackJsonp([1],{

/***/ 894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationPageModule", function() { return RegistrationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration__ = __webpack_require__(907);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistrationPageModule = /** @class */ (function () {
    function RegistrationPageModule() {
    }
    RegistrationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */]),
            ],
        })
    ], RegistrationPageModule);
    return RegistrationPageModule;
}());

//# sourceMappingURL=registration.module.js.map

/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_ProfessionalClass__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_customer_class__ = __webpack_require__(909);
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
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistrationPage = /** @class */ (function () {
    function RegistrationPage(navCtrl, navParams, viewCtrl, alertCtrl, afAuth, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.afAuth = afAuth;
        this.userService = userService;
        this.professional = new __WEBPACK_IMPORTED_MODULE_5__classes_ProfessionalClass__["a" /* ProfessionalClass */]();
        this.action = 'Registrarse';
        this.reg = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        };
        if (this.navParams.get('professional')) {
            this.loggedProfessional = this.navParams.get('professional');
            console.log('COmpleto:' + JSON.stringify(this.loggedProfessional));
            this.professional = this.loggedProfessional.jsonProfessional.person;
            this.professional.uid = this.loggedProfessional.userId;
            this.professional.startHour = this.loggedProfessional.startHour;
            this.professional.endHour = this.loggedProfessional.endHour;
            console.log('Professional:' + JSON.stringify(this.professional));
            this.action = 'Actualizar';
        }
        else {
            this.professional.personName = new __WEBPACK_IMPORTED_MODULE_6__classes_customer_class__["a" /* PersonName */]();
        }
    }
    RegistrationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistrationPage');
    };
    RegistrationPage.prototype.displayAlert = function (alertTitle, alertSub) {
        var theAlert = this.alertCtrl.create({
            title: alertTitle,
            subTitle: alertSub,
            buttons: ['OK']
        });
        theAlert.present();
    };
    RegistrationPage.prototype.registerAccount = function () {
        var _this = this;
        if (this.reg.password != this.reg.password2) {
            this.displayAlert('Problema con el Password', 'No hay coincidencia con los passwords');
            this.reg.password = '';
            this.reg.password2 = '';
        }
        else {
            this.reg.email = this.professional.email;
            this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.professional.email, this.reg.password)
                .then(function (res) { return _this.regSuccess(res); })
                .catch(function (err) { return _this.displayAlert('Error!', err); });
        }
    };
    RegistrationPage.prototype.updateAccount = function () {
        var _this = this;
        delete this.professional['email'];
        console.log("Update:" + JSON.stringify(this.professional));
        this.userService.updateDBUser(this.professional).subscribe(function (data) {
            console.log("UpdatedData:" + JSON.stringify(data));
            _this.viewCtrl.dismiss();
        });
    };
    RegistrationPage.prototype.regSuccess = function (result) {
        var _this = this;
        console.log("result:" + JSON.stringify(result));
        this.professional.uid = result.user.uid;
        console.log("this.professional:" + JSON.stringify(this.professional));
        this.userService.createDBUser(this.professional).subscribe(function (data) {
            _this.userService.logOn(_this.reg)
                .then(function (res) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]); });
        });
    };
    RegistrationPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    RegistrationPage.prototype.deleteUser = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: 'Esta opción borra físicamente su cuenta y toda su información relacionada: Citas, Pacientes, Servicios etc. Seleccione canclar para no continuar o eliminar para proseguir con el borrado',
            buttons: [{ text: 'Cancelar' },
                { text: 'Eliminar',
                    handler: function () {
                        _this.userService.deleteDBUser(_this.professional).subscribe(function (data) {
                            console.log("deleted:" + JSON.stringify(data));
                            _this.viewCtrl.dismiss();
                            _this.navCtrl.push('LoginPage');
                        });
                    }
                }]
        });
        alert.present();
    };
    RegistrationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registration',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/registration/registration.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>{{action}}</ion-title>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label color="facebook">Nombre</ion-label>\n    <ion-input type="text" [(ngModel)] = "professional.personName.firstName" name="name"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label color="facebook">Apellido</ion-label>\n    <ion-input type="text" [(ngModel)] = "professional.personName.lastName" name="lastName"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="action == \'Registrarse\'">\n    <ion-label color="facebook">Correo Electrónico</ion-label>\n    <ion-input type="email" [(ngModel)] = "professional.email" name="email"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="action == \'Registrarse\'">\n    <ion-label color="facebook">Password</ion-label>\n    <ion-input type="password" [(ngModel)] = "reg.password" name="password"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="action == \'Registrarse\'">\n    <ion-label color="facebook">Repetir Password</ion-label>\n    <ion-input type="password" [(ngModel)] = "reg.password2" name="password2"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Hora de Inicio (*)</ion-label>\n    <ion-input  type="number" placeholder="6" [(ngModel)]="professional.startHour" required="required">\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label >Hora de Salida (*)</ion-label>\n    <ion-input  type="number" placeholder="21" [(ngModel)]="professional.endHour" required="required">\n    </ion-input>\n  </ion-item>\n\n  <button ion-button full color="secondary" (click)="registerAccount()" *ngIf="action == \'Registrarse\'">Registrarse</button>\n  <button ion-button full color="secondary" (click)="updateAccount()" *ngIf="action == \'Actualizar\'">Actualizar</button>\n  <button ion-button full icon-left color="gray" (click)="cancel()" *ngIf="action == \'Actualizar\'">Cancelar</button>\n  <button ion-button full icon-left color="danger" (click)="deleteUser()" *ngIf="action == \'Actualizar\'">Eliminar</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/registration/registration.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]])
    ], RegistrationPage);
    return RegistrationPage;
}());

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfessionalClass; });
var ProfessionalClass = /** @class */ (function () {
    function ProfessionalClass() {
        this.startHour = "6";
        this.endHour = "21";
    }
    return ProfessionalClass;
}());

//# sourceMappingURL=ProfessionalClass.js.map

/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonName; });
/* unused harmony export Person */
/* unused harmony export CustomerClass */
;
var PersonName = /** @class */ (function () {
    function PersonName() {
    }
    return PersonName;
}());

;
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());

;
;
var CustomerClass = /** @class */ (function () {
    function CustomerClass() {
        this.name = this.person.personName.lastName + ' ' + this.person.personName.firstName;
        this.name = this.person.personName.lastName + ' ' + this.person.personName.firstName;
    }
    return CustomerClass;
}());

//# sourceMappingURL=customer-class.js.map

/***/ })

});
//# sourceMappingURL=1.js.map