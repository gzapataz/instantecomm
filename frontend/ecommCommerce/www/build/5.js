webpackJsonp([5],{

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(910);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_globals_service_globals_service__ = __webpack_require__(37);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, userService, globalService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.globalService = globalService;
        this.myForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](),
        });
        this.login = {
            name: '',
            lastName: '',
            email: '',
            password: ''
        };
        this.registrationPage = 'RegistrationPage';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signOn = function () {
        var _this = this;
        if (!this.login.email || !this.login.password) {
            this.userService.displayAlert('Error', "Ingresar correo electronico y password");
        }
        else {
            this.userService.logOn(this.login)
                .then(function (returned) {
                //console.log('RETORNO LOGGED: ' + JSON.stringify(returned))
                if (_this.userService.success) {
                    _this.globalService.readFromStorageProfessionalData().then(function (professionalData) {
                        console.log('DisparadoLOGIN0:' + JSON.stringify(professionalData));
                        console.log('Login Terminado');
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                    });
                }
                else {
                    console.log('elese error');
                    _this.login.email = '';
                    _this.login.password = '';
                }
            });
        }
    };
    LoginPage.prototype.forgotPwd = function (email) {
        var _this = this;
        console.log('email:' + this.login.email);
        if (this.login.email == "" || this.login.email == null || this.login.email == undefined) {
            var theAlert = this.alertCtrl.create({
                title: "eMail",
                subTitle: "Por favor ingrese el correo con el que está registrado",
                buttons: ['OK']
            });
            theAlert.present();
            return;
        }
        try {
            this.userService.sendPasswordReset(this.login.email).then(function (data) {
                console.log('DATA:' + data);
                if (data) {
                    var theAlert = _this.alertCtrl.create({
                        title: "Reinicio de Password",
                        subTitle: "Hemos enviado un mail a " + _this.login.email + " para el reingreso del password",
                        buttons: ['OK']
                    });
                    theAlert.present();
                    console.log('Enviado reset Pwd');
                }
            });
        }
        catch (e) {
        }
    };
    LoginPage.prototype.validate = function (control) {
        console.log('ERRORRRRR de CORREO');
        return null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "email", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/login/login.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n<ion-title>Inicio DentalApp</ion-title>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item>\n    <ion-label color="facebook">eMail</ion-label>\n    <ion-input type="email" [(ngModel)]="this.login.email" name="email" ngModel email="true"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label color="facebook">Password</ion-label>\n    <ion-input type="password" [(ngModel)]="login.password" name="password"></ion-input>\n  </ion-item>\n\n  <button ion-button color="secondary" (click)="signOn()">Ingresar</button>\n  <br>\n  <button ion-button color="alert" outline small (click)="forgotPwd()">olvidó su contraseña?</button>\n  <p>¿Todavía no pertenece a DentalApp?</p>\n  <button ion-button color="secondary" [navPush]="registrationPage">Registrarse aquí</button>\n</ion-content>\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=5.js.map