webpackJsonp([9],{

/***/ 888:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerAddModalPageModule", function() { return CustomerAddModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_add_modal__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(509);
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
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
            ],
        })
    ], CustomerAddModalPageModule);
    return CustomerAddModalPageModule;
}());

//# sourceMappingURL=customer-add-modal.module.js.map

/***/ }),

/***/ 903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerAddModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_countries_service_countries_service__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_alertmsg_alertmsg__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





//import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
var CustomerAddModalPage = /** @class */ (function () {
    function CustomerAddModalPage(navCtrl, navParams, viewCtrl, customerAddServiceProvider, alertCtrl, rest, modalCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.customerAddServiceProvider = customerAddServiceProvider;
        this.alertCtrl = alertCtrl;
        this.rest = rest;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.persona = {
            personName: {
                firstName: '',
                lastName: '',
            },
            //idType: null,
            //birthdate: null,
            //gender: null,
            phone: '',
            mobile: '',
            email: '',
            channels: 'WhatsApp',
        };
        this.contactPref = [{ code: 'WhatsApp', name: 'WhatsApp' },
            { code: 'Sms', name: 'Mensaje de Texto' },
            { code: 'Email', name: 'eMail' }];
        this.contactsfound = [];
        this.channelWhatsApps = false;
    }
    CustomerAddModalPage.prototype.ngOnInit = function () {
        this.professional = this.navParams.get('professional');
        //  console.log(this.professional);
        this.getCountries();
        this.codigo = '57';
        /*
            this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
              this.contactsfound = contacts;
            })
        */
    };
    CustomerAddModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss(this.person);
    };
    CustomerAddModalPage.prototype.save = function () {
        var _this = this;
        // @ts-ignore
        // @ts-ignore
        this.person = this.persona;
        var subTitle;
        //console.log(this.person);
        console.log('this.person.personName.firstName' + this.person.personName.firstName);
        console.log('this.person.personName.lastName' + this.person.personName.lastName);
        console.log('this.person.mobile' + this.person.mobile);
        console.log('this.person.email' + this.person.email);
        if (!this.person.personName.firstName || !this.person.personName.lastName || !this.person.mobile || (!this.person.email && this.person.channels == 'Email')) {
            if (!this.person.email && this.person.channels == 'Email') {
                subTitle = 'El mail es obligatorio cuando se selecciona eMail en las notificaciones masivas';
            }
            else {
                subTitle = 'Revise los datos incompletos: Nombre, Apellido, Teléfono Celular ';
            }
            var theAlert = this.alertCtrl.create({
                title: "Campos incompletos",
                subTitle: subTitle,
                buttons: ['OK']
            });
            theAlert.present();
        }
        else {
            if (!this.person.phone) {
                this.person.phone = "00";
            }
            this.person.mobile = this.codigo + this.persona.mobile;
            this.person.address;
            this.customerAddServiceProvider.addACustomer(this.person, this.professional.userId).subscribe(function (data) {
                console.log('Datos Salvados:' + JSON.stringify(data));
                if (_this.person.channels == 'WhatsApp') {
                    console.log('DATA APP:' + _this.person.channels);
                    _this.presentAlert(_this.person, _this.professional);
                }
                _this.cancel();
            });
        }
    };
    CustomerAddModalPage.prototype.presentAlert = function (person, professional) {
        return __awaiter(this, void 0, void 0, function () {
            var messageWA, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageWA = 'Buenas+tardes+Sr%28a%29%3A+' + person.personName['lastName'] + '%2C+este+mensaje+es+enviado+desde+el+consultorio+del+%28la%29+Dr%28a%29%3A+' + this.professional.jsonProfessional['person']['personName']['firstName'] + '+' + this.professional.jsonProfessional['person']['personName']['lastName'] + '.++Por+este+medio+le+recordaremos+oportunamente+sus+citas+y%2Fo+procedimientos+programados.++Con+el+fin+de+activar+el+servicio%2C+por+favor+presione+sobre+el+siguiente+texto+en+azul%3A+https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido';
                        console.log('Alert-PERSON:' + JSON.stringify(person));
                        console.log('Alert-PROF:' + JSON.stringify(professional.jsonProfessional));
                        console.log('Alert-MSJ:' + messageWA);
                        return [4 /*yield*/, this.alertCtrl.create({
                                title: 'Autorización WhatsApp',
                                message: '<div>' +
                                    '<p class="c-no-margin">Se ha seleccionado la opción de WhatsApp para las notificaciones masivas.' +
                                    'El paciente debe aceptar el envío de mensajes desde el número del servidor de OdontApp. Es necesario enviar desde su WhatsApp ' +
                                    'el mensaje con la autorización. Una vez el paciente acepte, podrá recibir mensajes automáticos. Presione el siguiente botón: ' +
                                    '<ion-buttons><button ion-button color="danger" small><a href=https://wa.me/' + person.mobile + '?text=' + messageWA + '>Enviar WhatsApp</a></button><ion-buttons></p>' +
                                    '</div>',
                                /*message:  'Se ha seleccionado la opción de WhatsApp para las notificaciones Masivas.' +
                                          'El paciente debe aceptar el envío de mensajes desde el número del servidor de OdontApp para eso es necesario enviar desde tu WhatsApp ' +
                                          'el mensaje con la autorización. Una vez el paciente acepte, podrá recibir mensajes automáticos ',*/
                                buttons: ['Cancelar', { text: 'Enviado', handler: function () {
                                            console.log('hola');
                                        }
                                    }]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerAddModalPage.prototype.onChangeTel = function (val) {
        if (this.codigo == '57' && val.length != 10 || this.codigo != '57' && val.length < 9) {
            var theAlert = this.alertCtrl.create({
                title: "Dígitos del Teléfono",
                subTitle: "El teléfono celular debe tener 10 dígitos",
                buttons: ['OK']
            });
            theAlert.present();
        }
        console.log('EVENTO' + JSON.stringify(val));
    };
    CustomerAddModalPage.prototype.getCountries = function () {
        var _this = this;
        var countryAux;
        this.rest.getCountries()
            .subscribe(function (countries) {
            _this.countries = countries;
            console.log('this.countries :' + countryAux);
        }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__components_alertmsg_alertmsg__["a" /* AlertmsgComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__components_alertmsg_alertmsg__["a" /* AlertmsgComponent */])
    ], CustomerAddModalPage.prototype, "hijo", void 0);
    CustomerAddModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-add-modal',template:/*ion-inline-start:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-buttons>\n    <ion-title>Agregar paciente</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label>Nombre y Apellido (*)</ion-label>\n      <ion-input type="text" placeholder="nombre" id="name" [(ngModel)]="persona.personName.firstName" name="name"\n                 required="required">\n      </ion-input>\n      <ion-input type="text" placeholder="apellido" id="lastname" [(ngModel)]="persona.personName.lastName" name="lastname"\n                 required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>E-mail</ion-label>\n      <ion-input type="email" placeholder="jon@gmail.com" id="email" [(ngModel)]="persona.email" name="email">\n\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Pais (*)</ion-label>\n      <ion-select type="text" placeholder="Código"  id="code" name="code" multiple="false " [(ngModel)]="codigo" >\n        <!--suppress TypeScriptUnresolvedVariable -->\n        <ion-option *ngFor="let c of countries" [value] = "c.callingCodes[0]" [selected]="c.callingCodes[0] == \'57\'">{{c.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Celular (*)</ion-label>\n      <ion-input type="tel" placeholder="celular" id="mobile" (ionBlur)=\'onChangeTel(persona.mobile)\' [(ngModel)]="persona.mobile" name="mobile"\n                 required="required">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Telefono Fijo</ion-label>\n      <ion-input type="tel" placeholder="0312345" id="phone" [(ngModel)]="persona.phone" name="phone">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Notificación Masiva</ion-label>\n      <ion-select type="text" placeholder="WhatsApp"  id="contact" name="contact" multiple="false" [(ngModel)]="persona.channels" >\n        <ion-option *ngFor="let contactPref of contactPref" [value] = "contactPref.code" [selected]="contactPref.code == \'WhatsApp\'">{{contactPref.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Campos obligatorios (*)</ion-label>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-buttons>\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon>\n      Adicionar\n    </button>\n  </ion-buttons>\n    <ion-list>\n      <ion-list-header>Follow us on Twitter</ion-list-header>\n      <ion-item *ngFor="let item of contactsfound">\n        {{ item.displayName }}\n        <p>{{ item.phoneNumbers }}</p>\n      </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/Gabriel/Documents/Universidad/ProyectoIntegrador/instantecomm/frontend/ecommCommerce/src/pages/customer-add/customer-add-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_customer_add_service_customer_add_service__["a" /* CustomerAddServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_countries_service_countries_service__["a" /* RestApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
    ], CustomerAddModalPage);
    return CustomerAddModalPage;
}());

//# sourceMappingURL=customer-add-modal.js.map

/***/ })

});
//# sourceMappingURL=9.js.map