webpackJsonp([0],{

/***/ 888:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventModal2PageModule", function() { return EventModal2PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_modal2__ = __webpack_require__(900);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventModal2PageModule = /** @class */ (function () {
    function EventModal2PageModule() {
    }
    EventModal2PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_modal2__["a" /* EventModalPage2 */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_modal2__["a" /* EventModalPage2 */]),
            ],
        })
    ], EventModal2PageModule);
    return EventModal2PageModule;
}());

//# sourceMappingURL=event-modal2.module.js.map

/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var UUID = (function () {
    function UUID() {
        // no-op
    }
    UUID.UUID = function () {
        if (typeof (window) !== "undefined" && typeof (window.crypto) !== "undefined" && typeof (window.crypto.getRandomValues) !== "undefined") {
            // If we have a cryptographically secure PRNG, use that
            // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            return (this.pad4(buf[0]) + this.pad4(buf[1]) + "-" + this.pad4(buf[2]) + "-" + this.pad4(buf[3]) + "-" + this.pad4(buf[4]) + "-" + this.pad4(buf[5]) + this.pad4(buf[6]) + this.pad4(buf[7]));
        }
        else {
            // Otherwise, just use Math.random
            // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
            // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
            return this.random4() + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" +
                this.random4() + "-" + this.random4() + this.random4() + this.random4();
        }
    };
    UUID.pad4 = function (num) {
        var ret = num.toString(16);
        while (ret.length < 4) {
            ret = "0" + ret;
        }
        return ret;
    };
    UUID.random4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return UUID;
}());
exports.UUID = UUID;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentClass; });
;
var AppointmentClass = /** @class */ (function () {
    function AppointmentClass(_id, idAppointment, idSchedule, startTime, endTime, durationTime, status, client, clientName, professional, service, title) {
        this._id = _id;
        this.idAppointment = idAppointment;
        this.idSchedule = idSchedule;
        this.startTime = startTime;
        this.endTime = endTime;
        this.durationTime = durationTime;
        this.status = status;
        this.client = client;
        this.clientName = clientName;
        this.professional = professional;
        this.service = service;
        this.title = title;
        this._id = _id;
        this.idAppointment = idAppointment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.durationTime = durationTime;
        this.status = status;
        this.client = client;
        this.clientName = clientName;
        this.professional = professional;
        this.service = service;
        this.title = title;
    }
    return AppointmentClass;
}());

//# sourceMappingURL=appointment-class.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventModalPage2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__ = __webpack_require__(894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_service_service_service_service__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_appointment_class__ = __webpack_require__(895);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventModalPage2 = /** @class */ (function () {
    function EventModalPage2(navCtrl, navParams, viewCtrl, servicesService, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.servicesService = servicesService;
        this.alertCtrl = alertCtrl;
        this.eventColor = 'default';
        this.servicesAvail = [];
        this.events = [];
        this.prevEventImage = undefined;
        this.minDate = new Date().toISOString();
        this.customerSelected = this.navParams.get('customerSelected');
        this.professional = this.navParams.get('professional');
        this.events = this.navParams.get('events');
        if (this.navParams.get('eventSelected')) {
            this.event = this.navParams.get('eventSelected');
            this.prevEventImage = Object.assign({}, this.event);
            this.event.startTime = __WEBPACK_IMPORTED_MODULE_2_moment__(this.event.startTime).format();
            this.event.endTime = __WEBPACK_IMPORTED_MODULE_2_moment__(this.event.endTime).format();
        }
        else {
            var preselectedDate = __WEBPACK_IMPORTED_MODULE_2_moment__(this.navParams.get('selectedDay')).format();
            var thsService = this.navParams.get('service');
            this.event = new __WEBPACK_IMPORTED_MODULE_5__classes_appointment_class__["a" /* AppointmentClass */](null, __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__["UUID"].UUID(), this.professional.idSchedule, preselectedDate, preselectedDate, null, null, this.customerSelected._id, this.customerSelected.name, this.professional.userId, thsService, null);
            this.event.startTime = preselectedDate;
            if (thsService !== undefined) {
                this.event.service = thsService;
                this.getServicesId(thsService).subscribe(function (data) {
                    _this.event.endTime = __WEBPACK_IMPORTED_MODULE_2_moment__(_this.event.startTime).add(data[0].averageTime, 'm').format();
                    _this.event.durationTime = data[0].averageTime;
                });
            }
        }
    }
    EventModalPage2.prototype.validateSlotTime = function (currentEvent) {
        var auxEvent = this.events.filter(function (eventDate) {
            return __WEBPACK_IMPORTED_MODULE_2_moment__(currentEvent.startTime).toDate() >= eventDate.startTime && __WEBPACK_IMPORTED_MODULE_2_moment__(currentEvent.endTime).toDate() >= eventDate.endTime && __WEBPACK_IMPORTED_MODULE_2_moment__(currentEvent.startTime).toDate() <= eventDate.endTime;
        });
        if (auxEvent.length > 0) {
            return false;
        }
        return true;
    };
    EventModalPage2.prototype.ngOnInit = function () {
        console.log('Me volvi a disparar');
        this.eventSelected = this.navParams.get('eventSelected');
        this.getServices();
    };
    EventModalPage2.prototype.getServices = function () {
        var _this = this;
        this.servicesService.getServices(this.professional.userId).subscribe(function (servicesAvail) {
            _this.servicesAvail = servicesAvail;
        });
    };
    EventModalPage2.prototype.getServicesId = function (id) {
        return this.servicesService.getServices(this.professional.userId).map(function (services) { return services.filter(function (result) { return result._id == id; }); });
    };
    EventModalPage2.prototype.onServiceSelected = function () {
        var _this = this;
        this.event.endTime = __WEBPACK_IMPORTED_MODULE_2_moment__(this.event.startTime).add(this.servicesAvail.find(function (serviceAvail) { return serviceAvail._id == _this.event.service; }).averageTime, 'm').format();
        this.event.durationTime = this.servicesAvail.find(function (serviceAvail) { return serviceAvail._id == _this.event.service; }).averageTime;
    };
    EventModalPage2.prototype.confirmAppnt = function (status) {
        this.event.status = status;
        this.viewCtrl.dismiss(this.event);
    };
    EventModalPage2.prototype.cancel = function () {
        if (this.navParams.get('eventSelected')) {
            this.event.service = this.prevEventImage.service;
        }
        this.viewCtrl.dismiss(this.prevEventImage);
    };
    EventModalPage2.prototype.save = function () {
        var _this = this;
        if (this.event.service) {
            this.event.title = this.servicesAvail.find(function (serviceAvail) { return serviceAvail._id == _this.event.service; }).name + ': ' + this.event.clientName;
            if (this.validateSlotTime(this.event)) {
                this.viewCtrl.dismiss(this.event);
            }
            else {
                var alert_1 = this.alertCtrl.create({
                    title: 'Espacio Ocupado',
                    subTitle: 'El espacio seleccionado ya tiene una cita agendada: Presione Agendar para permitir la doble agenda o Deshacer para no ingresar la cita',
                    buttons: [{ text: 'Deshacer' },
                        { text: 'Agendar',
                            handler: function () {
                                _this.viewCtrl.dismiss(_this.event);
                            }
                        }]
                });
                alert_1.present();
            }
        }
        else {
            this.eventColor = 'danger';
        }
    };
    EventModalPage2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-modal2',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/event-modal2/event-modal2.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="cancel()">\n        <ion-icon name="close">x</ion-icon>\n      </button>\n\n    </ion-buttons>\n    <ion-title>Cita: {{event.clientName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label color={{eventColor}}>Servicio</ion-label>\n      <ion-select  type="text" placeholder="Tpo" [(ngModel)]="event.service" (ionChange)="onServiceSelected()">\n        <ion-option  *ngFor="let service of servicesAvail" value={{service._id}}>{{service.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Inicio</ion-label>\n      <ion-datetime displayFormat="MM/DD/YYYY HH:mm" pickerFormat="MMM D:HH:mm" [(ngModel)]="event.startTime"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Fin</ion-label>\n      <ion-datetime displayFormat="MM/DD/YYYY HH:mm" pickerFormat="MMM D:HH:mm" [(ngModel)]="event.endTime"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>Estado</ion-label>\n      <ion-label end>{{event.status}}</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Todo el Día?</ion-label>\n      <ion-checkbox [(ngModel)]="event.allDay"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-buttons *ngIf="!this.eventSelected">\n    <button ion-button full icon-left color="secondary" (click)="save()">\n      <ion-icon name="checkmark"></ion-icon> Adicionar Cita\n    </button>\n  </ion-buttons>\n  <ion-buttons *ngIf="this.eventSelected">\n    <button ion-button small (click)="save()">\n      <ion-icon name="checkmark"></ion-icon> Actualizar Cita\n    </button>\n    <button ion-button small color="secondary" icon-left (click)="confirmAppnt(\'Confirmada\')">\n      <ion-icon name="checkmark"></ion-icon>Confirmar\n    </button>\n    <button ion-button small icon-left color="danger" (click)="confirmAppnt(\'Cancelada\')">\n      <ion-icon name="checkmark"></ion-icon>Cancelar Cita\n    </button>\n  </ion-buttons>\n</ion-content>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/event-modal2/event-modal2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_service_service_service_service__["a" /* ServiceServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], EventModalPage2);
    return EventModalPage2;
}());

//# sourceMappingURL=event-modal2.js.map

/***/ })

});
//# sourceMappingURL=0.js.map