webpackJsonp([12],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__preferences_service_preferences_service__ = __webpack_require__(145);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
/*

/*
  Generated class for the ScheduleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ScheduleServiceProvider = /** @class */ (function () {
    function ScheduleServiceProvider(http, messageService, preferencesProvider) {
        this.http = http;
        this.messageService = messageService;
        this.preferencesProvider = preferencesProvider;
        this.appntUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionals';
        console.log('Hello ScheduleServiceProvider Provider');
    }
    ScheduleServiceProvider.prototype.log = function (message) {
        this.messageService.add("AppointmentService: " + message);
    };
    ScheduleServiceProvider.prototype.getSchedule = function (professionalUID, startTime, endTime) {
        var _this = this;
        var finalURL = this.appntUrl + '/' + professionalUID + '/professionalsSchedule/appointments/?startTime=' + startTime + '&' + 'endTime=' + endTime;
        console.log('SchedulePorRangoURL:' + finalURL);
        return this.http.get(finalURL).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (result) {
            var appointments = result;
            appointments.forEach(function (appointment) {
                appointment.startTime = new Date(appointment.startTime);
                appointment.endTime = new Date(appointment.endTime);
                appointment = _this.preferencesProvider.getColor(appointment);
            });
            return appointments;
        }));
    };
    ScheduleServiceProvider.prototype.addScheduledAppnt = function (event) {
        var _this = this;
        console.log('Service: addScheduledAppointment:' + JSON.stringify(event));
        return this.http.post(this.appntUrl + '/', event, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (event) {
            _this.log("added appointment w/ id=" + event.id);
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('addAppointment')));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ScheduleServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(result);
        };
    };
    ScheduleServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__preferences_service_preferences_service__["a" /* PreferencesServiceProvider */]])
    ], ScheduleServiceProvider);
    return ScheduleServiceProvider;
}());

//# sourceMappingURL=schedule-service.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreferencesServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the PreferencesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PreferencesServiceProvider = /** @class */ (function () {
    function PreferencesServiceProvider(http) {
        this.http = http;
        console.log('Hello PreferencesServiceProvider Provider');
    }
    PreferencesServiceProvider.prototype.getColor = function (appointment) {
        switch (appointment.status) {
            case 'Confirmada': {
                appointment.eventColor = '#3bdb01';
                break;
            }
            case 'Agendada': {
                appointment.eventColor = '#db5614';
                break;
            }
            case 'Cancelada': {
                appointment.eventColor = '#db1c2c';
                break;
            }
            case 'Excepción': {
                appointment.eventColor = '#88888d';
                break;
            }
            default: {
                appointment.eventColor = '#4027db';
                break;
            }
        }
        return appointment;
    };
    PreferencesServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], PreferencesServiceProvider);
    return PreferencesServiceProvider;
}());

//# sourceMappingURL=preferences-service.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AppointmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var AppointmentServiceProvider = /** @class */ (function () {
    function AppointmentServiceProvider(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.appntUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionalsSchedule';
        console.log('Hello AppointmentServiceProvider Provider');
    }
    AppointmentServiceProvider.prototype.log = function (message) {
        this.messageService.add("AppointmentService: " + message);
    };
    /** POST: add a new Appointment to the server */
    AppointmentServiceProvider.prototype.addAppointment = function (event) {
        var _this = this;
        console.log('Service: addAppointment:' + JSON.stringify(event));
        return this.http.post(this.appntUrl + '/appointment/', event, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (event) {
            console.log('EN POST');
            _this.log("added appointment w/ id=" + event.idAppointment);
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('addAppointment')));
    };
    /** PUT: update Appointment to the server */
    AppointmentServiceProvider.prototype.updateAppointment = function (event) {
        var _this = this;
        console.log('Service: addAppointment:' + JSON.stringify(event));
        return this.http.put(this.appntUrl + '/appointment/', event, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (event) {
            console.log('EN POST');
            _this.log("added appointment w/ id=" + event.idAppointment);
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('addAppointment')));
    };
    AppointmentServiceProvider.prototype.getAppointment = function () {
        return this.http.get(this.appntUrl).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('getAppointments', [])));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    AppointmentServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(result);
        };
    };
    AppointmentServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */]])
    ], AppointmentServiceProvider);
    return AppointmentServiceProvider;
}());

//# sourceMappingURL=appointment-service.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
/*
  Generated class for the ServiceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceServiceProvider = /** @class */ (function () {
    //serviceUrl = environment.baseUrl + '/services';
    function ServiceServiceProvider(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        //http[s]://url_servidor:[puerto]/professionals/:uid/services
        this.serviceUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionals';
        console.log('Hello ServiceServiceProvider Provider');
    }
    ServiceServiceProvider.prototype.log = function (message) {
        this.messageService.add("ServicesService: " + message);
    };
    ServiceServiceProvider.prototype.getServices = function (professionalUID) {
        var finalURL = this.serviceUrl + '/' + professionalUID + '/services';
        console.log('ServicesURL:' + finalURL);
        return this.http.get(finalURL, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["catchError"])(this.handleError('getServices', [])));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ServiceServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(result);
        };
    };
    ServiceServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */]])
    ], ServiceServiceProvider);
    return ServiceServiceProvider;
}());

//# sourceMappingURL=service-service.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__globals_service_globals_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var UserServiceProvider = /** @class */ (function () {
    function UserServiceProvider(alertCtrl, afAuth, storage, afDataBase, http, globalService) {
        this.alertCtrl = alertCtrl;
        this.afAuth = afAuth;
        this.storage = storage;
        this.afDataBase = afDataBase;
        this.http = http;
        this.globalService = globalService;
        this.items = this.afDataBase.list("/users");
    }
    UserServiceProvider.prototype.displayAlert = function (alertTitle, alertSub) {
        var theAlert = this.alertCtrl.create({
            title: alertTitle,
            subTitle: alertSub,
            buttons: ['OK']
        });
        theAlert.present();
    };
    UserServiceProvider.prototype.logOut = function () {
        var _this = this;
        this.afAuth.auth.signOut()
            .then(function (loggedOut) {
            _this.displayAlert('Logged Out', null);
            _this.storageControl('delete');
            _this.storageControl('delete', 'idSchedule');
            _this.storageControl('delete', 'uid');
            _this.storageControl('delete', 'startHour');
            _this.storageControl('delete', 'endHour');
            _this.globalService.reSetProfessionalLoginData();
        })
            .catch(function (err) { return _this.displayAlert('Error Logged Out', err); });
    };
    UserServiceProvider.prototype.logOn = function (user) {
        var _this = this;
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
            _this.storageControl('get', user.email)
                .then(function (returned) {
                if (!returned) {
                    _this.getUserData(result.user.uid.toString()).subscribe(function (result) { return _this.getValuesProfessional(result); }, function (error) { return _this.handleError('getProfessional', []); });
                    _this.saveNewUser(user);
                }
            });
            _this.success = true;
            return result;
        })
            .catch(function (err) {
            _this.success = false;
            _this.displayAlert("Error", "Usuario no logueado" + err);
            return err;
        });
    };
    UserServiceProvider.prototype.saveNewUser = function (user) {
        var _this = this;
        var userObj = {
            username: user.email,
            name: user.name,
            lastName: user.lastName,
            creation: new Date().toDateString(),
            lastlogging: new Date().toLocaleString(),
            id: ''
        };
        this.items.push({
            username: user.email,
            name: user.name,
            lastName: user.lastName,
            creation: userObj.creation,
            lastloggin: userObj.lastlogging
        })
            .then(function (res) {
            userObj.id = res.key;
            return _this.storageControl('set', user.email, userObj);
        })
            .catch(function (err) {
            _this.displayAlert('Error Storage', err);
            console.log('Error user-service-saveNewUser: ' + err);
        });
        return this.storageControl('get');
    };
    UserServiceProvider.prototype.storageControl = function (action, key, value) {
        if (action == 'set') {
            return this.storage.set(key, value);
        }
        if (action == 'get') {
            return this.storage.get(key);
        }
        if (action == 'delete') {
            if (!key) {
                return this.storage.clear();
            }
            else {
                return this.storage.remove(key);
            }
        }
    };
    UserServiceProvider.prototype.getUserData = function (uid) {
        return this.http.get("https://ecommercealinstante.herokuapp.com/professionals/?uid=" + uid, httpOptions)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["catchError"])(this.handleError('getProfessional', [])))
            .map(function (data) { return data; });
    };
    UserServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__["of"])(result);
        };
    };
    UserServiceProvider.prototype.getValuesProfessional = function (jsonProfesional) {
        var _this = this;
        var obj = jsonProfesional['person'];
        for (var key in obj) {
            console.log("key: " + key + ", value: " + obj[key]);
            this.storageControl('set', key.toString(), obj[key]);
        }
        console.log('Horas:' + jsonProfesional['startHour'] + ' Y ' + jsonProfesional['endHour']);
        var obj2 = jsonProfesional['professionalSchedule'];
        this.storageControl('set', 'idSchedule', obj2['idSchedule']);
        this.storageControl('set', 'startHour', jsonProfesional['startHour']);
        this.storageControl('set', 'endHour', jsonProfesional['endHour']);
        this.storageControl('set', 'uid', jsonProfesional['uid']);
        this.storage.ready().then(function () {
            _this.storage.get('uid').then(function (uidData) {
                _this.storage.get('idSchedule').then(function (idSched) {
                    _this.storage.get('startHour').then(function (startHour) {
                        _this.storage.get('endHour').then(function (endHour) {
                            _this.globalService.setProfessionalLoginData(uidData, idSched, startHour, endHour);
                            console.log('LoggedSingleltonUpdates ' + JSON.stringify(_this.globalService.getLoggedProffessionalData())); //this is always null, even though I just set it to true.
                        });
                    });
                });
            });
        });
    };
    UserServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_9__globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], UserServiceProvider);
    return UserServiceProvider;
}());

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_calendar__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_customer__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { ScrollCalendarPage } from "../scroll-calendar/scroll-calendar";
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, alertCtrl, platform, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__calendar_calendar__["a" /* CalendarPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__customer_customer__["a" /* CustomerPage */];
        this.myIndex = navParams.data.tabIndex || 0;
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/tabs/tabs.html"*/'<ion-tabs [selectedIndex]="myIndex">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Mi Agenda" tabIcon="calendar"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Mis Pacientes" tabIcon="contacts"></ion-tab>\n\n  <!--ion-tab [root]="tab3Root" tabTitle="Mi Scroll" tabIcon="calendar"></ion-tab-->\n</ion-tabs>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_dragula__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_service_service_service_service__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_schedule_service_schedule_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_customer_service_customer_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_locales_es_CO__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_preferences_service_preferences_service__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_appointment_service_appointment_service__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_globals_service_globals_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_exception_service_exception_service__ = __webpack_require__(453);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












Object(__WEBPACK_IMPORTED_MODULE_9__angular_common__["k" /* registerLocaleData */])(__WEBPACK_IMPORTED_MODULE_8__angular_common_locales_es_CO__["a" /* default */]);



/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
var CalendarPage = /** @class */ (function () {
    function CalendarPage(navCtrl, navParams, alertCtrl, modalCtrl, dragulaService, servicesService, customerService, appointmentService, scheduleServiceProvider, platform, preferencesProvider, globalService, screenOrientation, exceptionServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.dragulaService = dragulaService;
        this.servicesService = servicesService;
        this.customerService = customerService;
        this.appointmentService = appointmentService;
        this.scheduleServiceProvider = scheduleServiceProvider;
        this.platform = platform;
        this.preferencesProvider = preferencesProvider;
        this.globalService = globalService;
        this.screenOrientation = screenOrientation;
        this.exceptionServiceProvider = exceptionServiceProvider;
        this.eventCollection = [];
        this.eventSelected = false;
        this.eventSource = [];
        this.eventExceptions = [];
        this.selectedDay = new Date();
        this.servicesAvail = [];
        this.theColor = 'white';
        this.fromDate = null;
        this.toDate = null;
        this.startHour = "9";
        this.endHour = '20';
        this.markDisabled = function (date) {
            var val = true;
            var current = new Date();
            //return this.findException(date);
            return date < current;
        };
        this.calendar = {
            mode: 'week',
            queryMode: 'remote',
            locale: __WEBPACK_IMPORTED_MODULE_8__angular_common_locales_es_CO__["a" /* default */][0],
            currentDate: new Date(),
            onTimePress: function (event) {
                if (this.isEventSelected) {
                    return;
                }
                //console.log('Aqui vamos en evento')
            },
            onClick: function () {
                //console.log('Aqui vamos en evento Click')
            },
            onMove: function (event) {
                ////console.log('MVX ' +  event.movementX + ' ' + event.movementY)
                ////console.log('Region ' +  event.region)
            },
            onMoveDown: function (event) {
                ////console.log('Down Fired' +  event.movementX + ' ' + event.movementY)
            },
            onRangeChanged: function (ev) {
                //console.log('RangeEstamos en Drop:' + ev)
            },
            onDrop: function () {
                //console.log('Estamos en Drop')
            },
            onDoubleClick: function () {
                //console.log('Doble Click')
            }
        };
    }
    CalendarPage.prototype.onSelect = function () {
        //console.log('DISP');
        this.theColor = 'black';
    };
    CalendarPage.prototype.receiveMessage = function ($event) {
        //console.log('Mensaje Recibido:' + $event);
        this.customerId = $event;
    };
    CalendarPage.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('Plataforma:' + this.platform.platforms());
        //console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
        this.loggedUser = this.globalService.getLoggedProffessionalData();
        if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
            console.log('SALIENDO:' + JSON.stringify(this.loggedUser));
            this.navCtrl.push('LoginPage');
            return;
        }
        else {
            this.startHour = this.loggedUser.startHour;
            this.endHour = this.loggedUser.endHour;
            try {
                this.dragulaService.destroy('SERVICE');
                this.dragulaService.createGroup('SERVICE', {
                    copy: function (el, source) {
                        //console.log('A Crear 1' + JSON.stringify(el.id) + ' Source ' + JSON.stringify(source));
                        _this.addEvent(el.id);
                        /*
                        let eventData = {
                          title: el.id,
                          startTime: new Date(),
                          endTime: new Date(),
                          eventColor: 'red'
                        };
            
                        let events = this.eventSource;
                        events.push(eventData);
                        //console.log('Source' + events);
                        this.eventSource = [];
                        setTimeout(() => {
                          this.eventSource = events;
                        });
                        */
                        return source.id === 'left';
                    },
                    copyItem: function (servAval) {
                        //console.log('A Crear 2');
                        return servAval;
                    },
                    accepts: function (el, target, source, sibling) {
                        // To avoid dragging from right to left container
                        //console.log('A Crear 3');
                        return target.id !== 'left';
                    }
                });
            }
            catch (e) {
                console.log('DRAGULA ERROR:' + e.toString());
            }
            this.getServices(this.loggedUser.userId);
            this.getCustomers(this.loggedUser.userId);
        }
    };
    CalendarPage.prototype.ngOnDestroy = function () {
        console.log('DESTROYENDO');
    };
    CalendarPage.prototype.findException = function (date) {
        var fest = this.eventExceptions.filter(function (exceptionList) {
            console.log('COMPARANDO:' + __WEBPACK_IMPORTED_MODULE_2_moment__(exceptionList.startTime).format("YYYYMMDD") + ' AND ' + __WEBPACK_IMPORTED_MODULE_2_moment__(date).format("YYYYMMDD"));
            return __WEBPACK_IMPORTED_MODULE_2_moment__(exceptionList.startTime).format("YYYYMMDD") === __WEBPACK_IMPORTED_MODULE_2_moment__(date).format("YYYYMMDD");
        });
        console.log('fest:' + JSON.stringify(fest));
        if (fest.length > 0)
            return true;
        return false;
    };
    CalendarPage.prototype.ionViewWillEnter = function () {
        this.loggedUser = this.globalService.getLoggedProffessionalData();
        if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
            var alert = this.alertCtrl.create({
                title: 'Errro de Ingreso',
                subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
                buttons: ['Dismiss']
            });
            alert.present();
            this.navCtrl.push('LoginPage');
        }
        else if (this.servicesAvail.length == 0) {
            this.getServices(this.loggedUser.userId);
            this.getCustomers(this.loggedUser.userId);
        }
        //this.loadEvents(this.loggedUser.userId);
    };
    CalendarPage.prototype.getServices = function (professionalUID) {
        var _this = this;
        this.servicesService.getServices(professionalUID).subscribe(function (servicesAvail) { return _this.servicesAvail = servicesAvail; });
    };
    CalendarPage.prototype.getCustomers = function (professionalUID) {
        var _this = this;
        this.customerService.getCustomers(professionalUID).subscribe(function (customers) {
            _this.customers = customers;
            //console.log('Customers' + JSON.stringify(this.customers));
            //console.log('CustomersName:' + customers[0].person.personName.firstName);
        });
    };
    CalendarPage.prototype.getCustomer = function (id) {
        var theCustomer;
        //console.log('Buscando cliente:' + id);
        this.customerService.getCustomer(id).subscribe(function (customer) { return theCustomer = customer; });
        return theCustomer;
    };
    CalendarPage.prototype.changeMode = function (newMode) {
        this.calendar.mode = newMode;
    };
    CalendarPage.prototype.updateEvent = function (event) {
        var _this = this;
        var appntCustomer = this.getCustomer(event.client);
        //console.log('Entrando a Cita Update:' + JSON.stringify(appntCustomer));
        var modal = this.modalCtrl.create('EventModalPage', { selectedDay: event.startTime, eventSelected: event, customerSelected: appntCustomer, professional: this.loggedUser, events: this.eventSource });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                var events_1 = _this.eventSource;
                var eventData_1 = events_1.find(function (x) { return x._id == data._id; });
                if (data.status !== 'Cancelada') {
                    eventData_1.title = data.title;
                    eventData_1.startTime = new Date(data.startTime);
                    eventData_1.endTime = new Date(data.endTime);
                    eventData_1 = _this.preferencesProvider.getColor(eventData_1);
                    _this.eventSelected = false;
                }
                else {
                    var index = events_1.indexOf(eventData_1);
                    if (index !== -1) {
                        events_1.splice(index, 1);
                    }
                }
                _this.appointmentService.updateAppointment(eventData_1).subscribe(function (data) {
                    eventData_1._id = data._id;
                    //console.log('Datos Salvados:' + JSON.stringify(data));
                });
                _this.eventSource = [];
                setTimeout(function () {
                    _this.eventSource = events_1;
                });
            }
        });
    };
    CalendarPage.prototype.addEvent = function (service) {
        var _this = this;
        if (service === void 0) { service = undefined; }
        //console.log('En Add-Service:' + service);
        //console.log('En SelectedDate:' + this.selectedDay + ' ' + this.selectedDay.getFullYear() + this.selectedDay.getMonth() + this.selectedDay.getDate() );
        var fromDateMls = new Date(this.selectedDay.toDateString()).getTime();
        var toDateMls = fromDateMls;
        fromDateMls -= 24 * 60 * 60 * 1000;
        toDateMls += 24 * 60 * 60 * 1000;
        var fromDate = new Date(fromDateMls);
        var toDate = new Date(toDateMls);
        var dayEvents = this.filterEvents(fromDate, toDate);
        if (this.customerId) {
            var modal = this.modalCtrl.create('EventModalPage', {
                selectedDay: this.selectedDay,
                eventSelected: null,
                customerSelected: this.customerId,
                service: service,
                professional: this.loggedUser,
                events: dayEvents
            });
            modal.present();
            modal.onDidDismiss(function (data) {
                if (data) {
                    var eventData_2 = data;
                    eventData_2.startTime = new Date(data.startTime);
                    eventData_2.endTime = new Date(data.endTime);
                    eventData_2.status = 'Agendada';
                    eventData_2 = _this.preferencesProvider.getColor(eventData_2);
                    eventData_2.professional = _this.loggedUser.userId;
                    var events_2 = _this.eventSource;
                    events_2.push(eventData_2);
                    _this.eventCollection.push(eventData_2);
                    _this.appointmentService.addAppointment(eventData_2).subscribe(function (data) {
                        eventData_2._id = data._id;
                        //console.log('Datos Salvados:' + JSON.stringify(data));
                    });
                    _this.eventSource = [];
                    _this.eventSelected = false;
                    setTimeout(function () {
                        _this.eventSource = events_2;
                    });
                }
            });
        }
        else {
            var alert = this.alertCtrl.create({
                title: 'Busqueda de Paciente',
                subTitle: 'Debe seleccionar un paciente en Buscar',
                buttons: ['Dismiss']
            });
            alert.present();
        }
    };
    CalendarPage.prototype.validateSlotTime = function (currentEvent) {
        var auxEvent = this.eventSource.filter(function (eventDate) {
            return currentEvent.startTime >= eventDate.startTime && currentEvent.endTime >= eventDate.endTime && currentEvent.startTime <= eventDate.endTime;
        });
        if (auxEvent.length > 0) {
            return false;
        }
        return true;
    };
    CalendarPage.prototype.filterEvents = function (fromDate, toDate) {
        return this.eventSource.filter(function (eventDate) {
            return fromDate <= eventDate.startTime && eventDate.endTime <= toDate;
        });
    };
    CalendarPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CalendarPage.prototype.onEventSelected = function (event) {
        console.log('Event onEventSelected ' + JSON.stringify(event));
        if (event.status !== 'Excepción') {
            this.eventSelected = true;
            this.updateEvent(event);
        }
    };
    CalendarPage.prototype.onTimeSelected = function (ev) {
        var _this = this;
        this.theColor = 'blue';
        //console.log('Event onTimeSelected' + ev + ' ' + this.eventSelected);
        this.selectedDay = ev.selectedTime;
        if (!this.eventSelected && (this.calendar.mode == 'day' || this.calendar.mode == 'week')) {
            if (!this.findException(this.selectedDay)) {
                if (this.customerId) {
                    this.addEvent();
                }
                else {
                    var alert = this.alertCtrl.create({
                        title: 'Busqueda de Paciente',
                        subTitle: 'Debe seleccionar un paciente en Buscar',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                }
            }
            else {
                var alert = this.alertCtrl.create({
                    title: 'Excepción',
                    subTitle: 'El dia es festivo o de excepción, desea agendar de todos modos?',
                    buttons: [{ text: 'NO' },
                        { text: 'SI',
                            handler: function () {
                                if (_this.customerId) {
                                    _this.addEvent();
                                }
                                else {
                                    var alert_1 = _this.alertCtrl.create({
                                        title: 'Busqueda de Paciente',
                                        subTitle: 'Debe seleccionar un paciente en Buscar',
                                        buttons: ['Dismiss']
                                    });
                                    alert_1.present();
                                }
                            }
                        }]
                });
                alert.present();
            }
        }
    };
    CalendarPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad CalendarPage');
    };
    CalendarPage.prototype.refreshView = function () {
        this.loadEvents(this.loggedUser.userId, __WEBPACK_IMPORTED_MODULE_2_moment__(this.fromDate).format(), __WEBPACK_IMPORTED_MODULE_2_moment__(this.toDate).format());
        this.loadExceptions(this.loggedUser.userId, __WEBPACK_IMPORTED_MODULE_2_moment__(this.fromDate).format(), __WEBPACK_IMPORTED_MODULE_2_moment__(this.toDate).format());
    };
    CalendarPage.prototype.loadEvents = function (professionalUID, startTime, endTime) {
        var _this = this;
        this.scheduleServiceProvider.getSchedule(professionalUID, startTime, endTime).subscribe(function (data) {
            ////console.log("datos de Agenda Queyr:" + JSON.stringify(data))
            _this.eventSource = data; //['appointments'];
            _this.eventSource = _this.eventSource.filter(function (data) { return data.status !== 'Cancelada'; });
            console.log('DatosAgenda:' + JSON.stringify(_this.eventSource));
        });
        console.log('DatosAgenda:' + JSON.stringify(this.eventSource));
        //Cargar eventos
    };
    CalendarPage.prototype.loadExceptions = function (professionalUID, startTime, endTime) {
        var _this = this;
        this.exceptionServiceProvider.getException(professionalUID, startTime, endTime).subscribe(function (data) {
            ////console.log("datos de Agenda Queyr:" + JSON.stringify(data))
            console.log('DATAExcepciones:' + JSON.stringify(data));
            _this.eventExceptions = data; //['appointments'];
            console.log('Excepciones:' + JSON.stringify(_this.eventExceptions));
        });
        //Cargar eventos
    };
    CalendarPage.prototype.onRangeChanged = function (ev) {
        //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
        //console.log('Leer eventos del servidor');
        this.fromDate = ev.startTime;
        this.toDate = ev.endTime;
        this.loadEvents(this.loggedUser.userId, __WEBPACK_IMPORTED_MODULE_2_moment__(ev.startTime).format(), __WEBPACK_IMPORTED_MODULE_2_moment__(ev.endTime).format());
        this.loadExceptions(this.loggedUser.userId, __WEBPACK_IMPORTED_MODULE_2_moment__(ev.startTime).format(), __WEBPACK_IMPORTED_MODULE_2_moment__(ev.endTime).format());
    };
    CalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calendar',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/calendar/calendar.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>Mi Agenda</ion-title>\n    <!--<button ion-button icon-only [menuToggle] start>\n      <img src="../assets/images/navicon.png" width="20" height="20" >\n    </button>-->\n    <ion-icon name="menu" icon-only [menuToggle] start left></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <customer-search (messageEvent)="receiveMessage($event)"></customer-search>\n  <ion-row>\n    <div *ngIf="platform.is(\'tablet\') || platform.is(\'core\') || screenOrientation.type == \'landscape-secondary\' || screenOrientation.type == \'landscape-primary\'">\n      <ion-col col-4 col-md-4 col-lg-6 >\n        <ion-list dragula="SERVICE" id="left" [(dragulaModel)]="servicesAvail">\n          <ion-item *ngFor="let service of servicesAvail" id={{service._id}}>{{service.name}}</ion-item>\n        </ion-list>\n      </ion-col>\n    </div>\n      <ion-col col-12 col-sm-12 col-md-8 col-lg-8>\n        <div align-items-start>\n          <ion-title>\n            {{ viewTitle }}\n          </ion-title>\n        </div>\n        <!--ion-buttons end>\n          {{ viewTitle }}\n          <button ion-button (click)="loadEvents()"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons-->\n\n\n     <ion-navbar color="primary">\n       <ion-buttons>\n         <button ion-button (click)="changeMode(\'day\')">Hoy</button>\n         <button ion-button (click)="changeMode(\'month\')">Mes</button>\n         <button ion-button (click)="changeMode(\'week\')">Semana</button>\n         <button ion-button (click)="changeMode(\'day\')">Dia</button>\n         <button ion-button (click)="refreshView()"><ion-icon name="refresh"></ion-icon></button>\n       </ion-buttons>\n       <ion-buttons end>\n         <button ion-button icon-only (click)="addEvent()">\n           <ion-icon name="add"></ion-icon>\n         </button>\n       </ion-buttons>\n     </ion-navbar>\n\n       <ng-template #template3 let-displayEvent="displayEvent" let-hourParts="hourParts">\n          <div class="calendar-event-inner"\n               [ngStyle]="{\'background-color\': displayEvent.event.eventColor, color: \'white\'}"\n               [style.top]="(37*displayEvent.startOffset/hourParts)+\'px\'"\n               [style.left]="100/displayEvent.overlapNumber*displayEvent.position+\'%\'"\n               [style.width]="100/displayEvent.overlapNumber+\'%\'"\n               [style.height]="37*(displayEvent.endIndex - displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/2) + \'px\'">\n            {{displayEvent.event.title}}\n            <br>\n            {{displayEvent.event.status}}\n          </div>\n        </ng-template>\n\n        <ng-template #template2 let-displayEvent="displayEvent" let-hourParts="hourParts">\n          <div class="calendar-event-inner"\n               [ngStyle]="{\'background-color\': displayEvent.event.eventColor, color: \'white\'}"\n               [style.top]="(37*displayEvent.startOffset/hourParts)+\'px\'"\n               [style.left]="100/displayEvent.overlapNumber*displayEvent.position+\'%\'"\n               [style.width]="100/displayEvent.overlapNumber+\'%\'"\n               [style.height]="37*(displayEvent.endIndex - displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/2) + \'px\'">\n            {{displayEvent.event.title}}\n            <br>\n            {{displayEvent.event.status}}\n          </div>\n        </ng-template>\n\n        <ng-template #template1 let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">\n          <ion-list class="event-detail-container" has-bouncing="false" *ngIf="showEventDetail" overflow-scroll="false">\n            <ion-item *ngFor="let event of selectedDate?.events" (click)="onEventSelected(event)">\n                        <span *ngIf="!event.allDay" class="monthview-eventdetail-timecolumn">{{event.startTime|date: \'HH:mm\'}}\n                            -\n                            {{event.endTime|date: \'HH:mm\'}}\n                        </span>\n              <span *ngIf="event.allDay" class="monthview-eventdetail-timecolumn">All day</span>\n              <span class="event-detail">  |  {{event.title}} - {{event.status}}</span>\n            </ion-item>\n            <ion-item *ngIf="selectedDate?.events.length==0">\n              <div class="no-events-label">No hay Citas programadas</div>\n            </ion-item>\n          </ion-list>\n        </ng-template>\n\n       <calendar [eventSource]="eventSource"\n                 [calendarMode]="calendar.mode"\n                 [markDisabled]="markDisabled"\n                 [queryMode]="calendar.queryMode"\n                 [currentDate]="calendar.currentDate"\n                 (press)="calendar.onTimePress($event)"\n                 (click)="calendar.onClick()"\n                 (doubleclick)="calendar.onDoubleClick()"\n                 (mousemove)="calendar.onMove($event)"\n                 (mousedown)="calendar.onMoveDown($event)"\n                 (drop)="calendar.onDrop()"\n                 (dragover)="calendar.onDrop()"\n                 (onEventSelected)="onEventSelected($event)"\n                 (onTitleChanged)="onViewTitleChanged($event)"\n                 (onTimeSelected)="onTimeSelected($event)"\n                 (onRangeChanged)="onRangeChanged($event)"\n                 [locale]="calendar.locale"\n                 [dayviewNormalEventTemplate]="template3"\n                 [weekviewNormalEventTemplate]="template2"\n                 [monthviewEventDetailTemplate]="template1"\n                 step="30"\n                 startHour={{startHour}}\n                 endHour={{endHour}}\n                 class="calendar">\n       </calendar>\n\n\n\n\n   </ion-col>\n  </ion-row>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/calendar/calendar.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_dragula__["b" /* DragulaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_dragula__["b" /* DragulaService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_service_service_service_service__["a" /* ServiceServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_service_service_service_service__["a" /* ServiceServiceProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__providers_customer_service_customer_service__["a" /* CustomerServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_customer_service_customer_service__["a" /* CustomerServiceProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_11__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_10__providers_preferences_service_preferences_service__["a" /* PreferencesServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__providers_preferences_service_preferences_service__["a" /* PreferencesServiceProvider */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_12__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_13__providers_exception_service_exception_service__["a" /* ExceptionServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__providers_exception_service_exception_service__["a" /* ExceptionServiceProvider */]) === "function" && _p || Object])
    ], CalendarPage);
    return CalendarPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_customer_service_customer_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_globals_service_globals_service__ = __webpack_require__(52);
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
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerPage = /** @class */ (function () {
    function CustomerPage(navCtrl, navParams, customerService, modalCtrl, alertCtrl, globalService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.customerService = customerService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.globalService = globalService;
        this.eventSelected = false;
        this.eventSource = [];
        this.myCustomers = [];
        this.selectedDay = new Date();
    }
    CustomerPage.prototype.getCustomers = function (professionaUID) {
        var _this = this;
        this.customerService.getCustomers(professionaUID).subscribe(function (data) { return _this.myCustomers = data; });
    };
    CustomerPage.prototype.ngOnInit = function () {
        //console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
        var userLogged = this.globalService.getLoggedProffessionalData();
        this.loggedUser = this.globalService.getLoggedProffessionalData();
        if (userLogged.userId === '' || userLogged.userId == null) {
            return;
        }
        ;
        this.getCustomers(userLogged.userId);
    };
    CustomerPage.prototype.ionViewWillEnter = function () {
        var userLogged = this.globalService.getLoggedProffessionalData();
        if (userLogged.userId === '' || userLogged.userId == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Errro de Ingreso',
                subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
                buttons: ['Dismiss']
            });
            alert_1.present();
            this.navCtrl.push('LoginPage');
        }
        else if (this.myCustomers.length == 0) {
            this.getCustomers(userLogged.userId);
        }
    };
    CustomerPage.prototype.addNewAppointment = function (customer) {
        //console.log(`Clicked customer:` + JSON.stringify(customer));
        this.addEvent(customer);
    };
    CustomerPage.prototype.customerSelected = function (customer) {
        this.customer = customer;
        //this.navCtrl.push('CustomerDetailPage', {customer: customer});
        //console.log(`Clicked customer:` + customer)
        var modal = this.modalCtrl.create('CustomerDetailPage', {
            customer: customer
        });
        modal.present();
    };
    CustomerPage.prototype.addEvent = function (customer) {
        var _this = this;
        var modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay, eventSelected: null, customerSelected: customer });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                var eventData = data;
                eventData.startTime = new Date(data.startTime);
                eventData.endTime = new Date(data.endTime);
                eventData.eventColor = 'blue';
                eventData.status = 'Agendada';
                var events_1 = _this.eventSource;
                events_1.push(eventData);
                /*this.appointmentService.addAppointment(eventData).subscribe(data => {
                  //console.log('Datos Salvados:' + JSON.stringify(data));
                });*/
                _this.eventSource = [];
                _this.eventSelected = false;
                setTimeout(function () {
                    _this.eventSource = events_1;
                });
            }
        });
    };
    CustomerPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad CustomerPage');
    };
    CustomerPage.prototype.startChat = function (mobile) {
    };
    CustomerPage.prototype.addCustomer = function () {
        var _this = this;
        var userLogged = this.globalService.getLoggedProffessionalData();
        if (userLogged.userId === '' || userLogged.userId == null) {
            var alert_2 = this.alertCtrl.create({
                title: 'Errro de Ingreso',
                subTitle: 'Debe ingresar sus credenciales antes agregar un paciente',
                buttons: ['Dismiss']
            });
            alert_2.present();
        }
        else {
            var modal = this.modalCtrl.create('CustomerAddModalPage', {
                professional: this.loggedUser
            });
            modal.present();
            modal.onDidDismiss(function (data) {
                _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
            });
        }
    };
    CustomerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/customer/customer.html"*/'<!--\n  Generated template for the CustomerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>Mis pacientes</ion-title>\n    <!--<button ion-button icon-only [menuToggle] start>\n      <img src="../assets/images/navicon.png" width="20" height="20" >\n    </button>-->\n    <ion-icon name="menu" icon-only [menuToggle] start left></ion-icon>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addCustomer()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid *ngFor="let customer of myCustomers">\n    <ion-row>\n      <ion-col (click)="customerSelected(customer)">\n          {{customer.person.personName.lastName}} {{customer.person.personName.firstName}}\n      </ion-col>\n      <ion-col>\n        <ion-buttons end>\n          <!--button ion-button color="secondary" small (click)="addNewAppointment(customer)"><ion-icon name="calendar"></ion-icon></button-->\n          <button ion-button color="secondary" small><a href="tel:{{customer.person.phone}}"><ion-icon name="call"></ion-icon> </a></button>\n          <button ion-button color="secondary" small><a href="https://wa.me/{{customer.person.phone}}"><ion-icon name="chatbubbles"></ion-icon>  </a></button>\n          <button ion-button color="secondary" small><a href="mailto:{{customer.person.email}}" target="_top"><ion-icon name="mail"></ion-icon> </a></button>\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/customer/customer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_customer_service_customer_service__["a" /* CustomerServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], CustomerPage);
    return CustomerPage;
}());

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_schedule_service_schedule_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_locales_es_CO__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_appointment_service_appointment_service__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_globals_service_globals_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { ServiceServiceProvider } from "../../providers/service-service/service-service";




Object(__WEBPACK_IMPORTED_MODULE_5__angular_common__["k" /* registerLocaleData */])(__WEBPACK_IMPORTED_MODULE_4__angular_common_locales_es_CO__["a" /* default */]);



var HomePage = /** @class */ (function () {
    function HomePage(navParams, alertCtrl, modalCtrl, appointmentService, scheduleServiceProvider, globalService, platform, screenOrientation) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.appointmentService = appointmentService;
        this.scheduleServiceProvider = scheduleServiceProvider;
        this.globalService = globalService;
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.eventSelected = false;
        this.eventSource = [];
        this.selectedDay = new Date();
        this.theColor = 'white';
        this.calendar = {
            mode: 'day',
            locale: __WEBPACK_IMPORTED_MODULE_4__angular_common_locales_es_CO__["a" /* default */][0],
            currentDate: new Date(),
            onTimePress: function (event) {
                if (this.isEventSelected) {
                    return;
                }
                console.log('Aqui vamos en evento');
            },
            onClick: function () {
                console.log('Aqui vamos en evento Click');
            },
            onMove: function (event) {
                //console.log('MVX ' +  event.movementX + ' ' + event.movementY)
                //console.log('Region ' +  event.region)
            },
            onMoveDown: function (event) {
                //console.log('Down Fired' +  event.movementX + ' ' + event.movementY)
            },
            //onDrop(){
            //console.log('Estamos en Drop')
            //},
            onDoubleClick: function () {
                console.log('Doble Click');
            }
        };
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(2, 0, 0);
            return date < current;
        };
    }
    HomePage.prototype.onSelect = function () {
        console.log('DISP');
        this.theColor = 'black';
    };
    HomePage.prototype.ngOnInit = function () {
        console.log('LOGGED CALENDAR1:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
        var userLogged = this.globalService.getLoggedProffessionalData();
        if (userLogged.userId === '' || userLogged.userId == null) {
            console.log("datos de Agenda Quey11 return 1:");
            return;
        }
        ;
        this.initdata();
    };
    HomePage.prototype.initdata = function () {
        this.loggedUser = this.globalService.getLoggedProffessionalData();
        this.loadEvents();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var userLogged = this.globalService.getLoggedProffessionalData();
        if (userLogged.userId === '' || userLogged.userId == null) {
            console.log("datos de Agenda Quey11 return 2:");
            return;
        }
        ;
        console.log("datos de Agenda Quey22 user:" + userLogged.userId);
        this.initdata();
    };
    HomePage.prototype.validateSlotTime = function (currentEvent) {
        var auxEvent = this.eventSource.filter(function (eventDate) {
            return currentEvent.startTime >= eventDate.startTime && currentEvent.endTime >= eventDate.endTime && currentEvent.startTime <= eventDate.endTime;
        });
        if (auxEvent.length > 0) {
            return false;
        }
        return true;
    };
    HomePage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    HomePage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    HomePage.prototype.onEventSelected = function (event) {
        console.log('Event onEventSelected ' + JSON.stringify(event));
        this.eventSelected = true;
        //  this.updateEvent(event);
    };
    HomePage.prototype.onTimeSelected = function (ev) {
        this.theColor = 'blue';
        console.log('Event onTimeSelected' + ev + ' ' + this.eventSelected);
        this.selectedDay = ev.selectedTime;
        if (!this.eventSelected && this.calendar.mode == 'day') {
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalendarPage');
    };
    HomePage.prototype.loadEvents = function () {
        var _this = this;
        var fromDate = __WEBPACK_IMPORTED_MODULE_3_moment__(new Date().setHours(0, 0, 0, 0)).format();
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        var toDate = __WEBPACK_IMPORTED_MODULE_3_moment__(tomorrow.setHours(0, 5, 0, 0)).format();
        console.log('DatosAgenda tiempo2:' + fromDate + " end " + toDate);
        this.scheduleServiceProvider.getSchedule(this.loggedUser.userId, fromDate, toDate).subscribe(function (data) {
            console.log("datos de Agenda Quey2:" + JSON.stringify(data));
            _this.eventSource = data; //['appointments'];
            console.log('DatosAgenda2:' + JSON.stringify(_this.eventSource));
        });
        //Cargar eventos
    };
    HomePage.prototype.onRangeChanged = function (ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>  Mi agenda diaria</ion-title>\n    <!--<button ion-button icon-only [menuToggle] start>\n      <img src="../assets/images/navicon.png" width="20" height="20" >\n    </button>-->\n    <ion-icon name="menu" icon-only [menuToggle] start left></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-row>\n\n    <div *ngIf="platform.is(\'tablet\') || platform.is(\'core\') || screenOrientation.type == \'landscape-secondary\' || screenOrientation.type == \'landscape-primary\'">\n\n    </div>\n    <ion-col col-12 col-sm-12 col-md-8 col-lg-8>\n\n      <ion-navbar color="primary">\n        <ion-buttons>\n\n          <button ion-button >Hoy es {{viewTitle}}</button>\n\n\n\n        </ion-buttons>\n      </ion-navbar>\n\n      <ng-template #template3 let-displayEvent="displayEvent" let-hourParts="hourParts">\n        <div class="calendar-event-inner"\n             [ngStyle]="{\'background-color\': displayEvent.event.eventColor, color: \'white\'}"\n             [style.top]="(37*displayEvent.startOffset/hourParts)+\'px\'"\n             [style.left]="100/displayEvent.overlapNumber*displayEvent.position+\'%\'"\n             [style.width]="100/displayEvent.overlapNumber+\'%\'"\n             [style.height]="37*(displayEvent.endIndex - displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/2) + \'px\'">\n          {{displayEvent.event.title}}\n          <br>\n          {{displayEvent.event.status}}\n        </div>\n      </ng-template>\n\n      <ng-template #template2 let-displayEvent="displayEvent" let-hourParts="hourParts">\n        <div class="calendar-event-inner"\n             [ngStyle]="{\'background-color\': displayEvent.event.eventColor, color: \'white\'}"\n             [style.top]="(37*displayEvent.startOffset/hourParts)+\'px\'"\n             [style.left]="100/displayEvent.overlapNumber*displayEvent.position+\'%\'"\n             [style.width]="100/displayEvent.overlapNumber+\'%\'"\n             [style.height]="37*(displayEvent.endIndex - displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/2) + \'px\'">\n          {{displayEvent.event.title}}\n          <br>\n          {{displayEvent.event.status}}\n        </div>\n      </ng-template>\n\n      <ng-template #template1 let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">\n        <ion-list class="event-detail-container" has-bouncing="false" *ngIf="showEventDetail" overflow-scroll="false">\n          <ion-item *ngFor="let event of selectedDate?.events" (click)="onEventSelected(event)">\n                        <span *ngIf="!event.allDay" class="monthview-eventdetail-timecolumn">{{event.startTime|date: \'HH:mm\'}}\n                            -\n                            {{event.endTime|date: \'HH:mm\'}}\n                        </span>\n            <span *ngIf="event.allDay" class="monthview-eventdetail-timecolumn">All day</span>\n            <span class="event-detail">  |  {{event.title}} - {{event.status}}</span>\n          </ion-item>\n          <ion-item *ngIf="selectedDate?.events.length==0">\n            <div class="no-events-label">No hay Citas programadas</div>\n          </ion-item>\n        </ion-list>\n      </ng-template>\n\n      <calendar [eventSource]="eventSource"\n                [calendarMode]="calendar.mode"\n                [currentDate]="calendar.currentDate"\n                (press)="calendar.onTimePress($event)"\n                (click)="calendar.onClick()"\n                (doubleclick)="calendar.onDoubleClick()"\n                (mousemove)="calendar.onMove($event)"\n                (mousedown)="calendar.onMoveDown($event)"\n                (drop)="calendar.onDrop()"\n                (dragover)="calendar.onDrop()"\n                (onEventSelected)="onEventSelected($event)"\n                (onTitleChanged)="onViewTitleChanged($event)"\n                (onTimeSelected)="onTimeSelected($event)"\n                [locale]="calendar.locale"\n                [dayviewNormalEventTemplate]="template3"\n                [weekviewNormalEventTemplate]="template2"\n                [monthviewEventDetailTemplate]="template1"\n                step="30"\n                startHour="9"\n                endHour="20"\n                class="calendar">\n      </calendar>\n\n\n\n\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */]) === "function" && _h || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/calendar/calendar.module": [
		882,
		11
	],
	"../pages/customer-add/customer-add-modal.module": [
		884,
		8
	],
	"../pages/customer-detail/customer-detail.module": [
		883,
		7
	],
	"../pages/customer-modal/customer-modal.module": [
		885,
		6
	],
	"../pages/customer/customer.module": [
		886,
		10
	],
	"../pages/event-modal/event-modal.module": [
		887,
		1
	],
	"../pages/event-modal2/event-modal2.module": [
		888,
		0
	],
	"../pages/home/home.module": [
		889,
		9
	],
	"../pages/login/login.module": [
		890,
		5
	],
	"../pages/registration/registration.module": [
		891,
		4
	],
	"../pages/scroll-calendar/scroll-calendar.module": [
		892,
		3
	],
	"../pages/scroll-home/scroll-home.module": [
		893,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 233;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExceptionServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AppointmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
/*
  Generated class for the ExceptionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ExceptionServiceProvider = /** @class */ (function () {
    function ExceptionServiceProvider(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.exceptionUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionals';
        console.log('Hello ExceptionServiceProvider Provider');
    }
    ExceptionServiceProvider.prototype.log = function (message) {
        this.messageService.add("AppointmentService: " + message);
    };
    ExceptionServiceProvider.prototype.getException = function (professionalUID, startTime, endTime) {
        var finalURL = this.exceptionUrl + '/' + professionalUID + '/professionalsSchedule/exceptions/?startTime=' + startTime + '&' + 'endTime=' + endTime;
        return this.http.get(finalURL).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (data) {
            return data;
        }));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ExceptionServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(result);
        };
    };
    ExceptionServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */]])
    ], ExceptionServiceProvider);
    return ExceptionServiceProvider;
}());

//# sourceMappingURL=exception-service.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MessageServiceProvider = /** @class */ (function () {
    function MessageServiceProvider(http) {
        this.http = http;
        this.messages = [];
        console.log('Hello MessageServiceProvider Provider');
    }
    MessageServiceProvider.prototype.add = function (message) {
        this.messages.push(message);
    };
    MessageServiceProvider.prototype.clear = function () {
        this.messages = [];
    };
    MessageServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], MessageServiceProvider);
    return MessageServiceProvider;
}());

//# sourceMappingURL=message-service.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_customer_service_customer_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_globals_service_globals_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Tell Angular2 we're creating a Pipe with TypeScript decorators
var CustomerSearchComponent = /** @class */ (function () {
    function CustomerSearchComponent(customerService, modalCtrl, globalService) {
        this.customerService = customerService;
        this.modalCtrl = modalCtrl;
        this.globalService = globalService;
        this.openAlready = false;
        this.srcTitle = "Busqueda de Paciente";
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.show = true;
        this.customerTest = [];
        this.messageEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    // Push a search term into the observable stream.
    CustomerSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    //Filter de array based in the pattern args
    CustomerSearchComponent.prototype.transform = function (value, args) {
        // ES6 array destructuring
        var pattern = args[0];
        return value.filter(function (task) {
            console.log('CUSTOMERLIST:' + JSON.stringify(task));
            var reg = new RegExp(pattern);
            console.log('FOUNDREG:' + JSON.stringify(reg) + ' PATTER ' + pattern);
            var found = reg.test(task.person.personName.lastName);
            if (!found) {
                found = reg.test(task.person.personName.firstName);
            }
            console.log('FOUND:' + JSON.stringify(found));
            return found;
        });
    };
    CustomerSearchComponent.prototype.selectedName = function (id, name, customer) {
        console.log('Seleccionado:' + id + ' ');
        this.show = false;
        this.myInput = name;
        this.custId$ = id;
        this.messageEvent.emit(customer);
    };
    CustomerSearchComponent.prototype.onInput = function (ev) {
        var _this = this;
        console.log('OnInput Search:' + ev.target.value);
        if (ev.target.value != undefined && ev.target.value !== '' && !this.openAlready) {
            this.customerService.searchCustomers(ev.target.value, this.loggedUser.userId).subscribe(function (customers) {
                _this.customerTest = _this.transform(customers, ev.target.value);
                console.log('CusotmerOnInput:' + JSON.stringify(_this.customerTest));
                _this.modal = _this.modalCtrl.create('CustomerModalPage', { customerList: _this.customerTest });
                _this.modal.present();
                _this.openAlready = true;
                _this.modal.onDidDismiss(function (data) {
                    if (data !== undefined) {
                        _this.selectedName(data._id, data.name, data);
                    }
                    _this.openAlready = false;
                });
            }, null);
        }
        else {
            console.log('Search Nulo');
            this.selectedName(undefined, undefined, undefined);
        }
    };
    CustomerSearchComponent.prototype.onClear = function (ev) {
        console.log('Clear Fired');
        //this.myInput = undefined;
        this.messageEvent.emit(undefined);
    };
    CustomerSearchComponent.prototype.ngOnInit = function () {
        this.loggedUser = this.globalService.getLoggedProffessionalData();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], CustomerSearchComponent.prototype, "messageEvent", void 0);
    CustomerSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'RegexPipe'
        })
        /**
         * Generated class for the CustomerSearchComponent component.
         *
         * See https://angular.io/api/core/Component for more info on Angular
         * Components.
         */
        ,
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'customer-search',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/components/customer-search/customer-search.html"*/'<!-- Generated template for the CustomerSearchComponent component -->\n<div id="search-component">\n  <!--input #searchBox id="search-box" (keyup)="search(searchBox.value)" /-->\n  <ion-searchbar\n    [(ngModel)]="myInput"\n    [placeholder]="srcTitle"\n    [autocomplete]="on"\n    [debounce]="500"\n    [showCancelButton]="shouldShowCancel"\n    (ionInput)="onInput($event)"\n    (ionCancel)="onCancel($event)"\n    (ionClear)="onClear($event)">\n  </ion-searchbar>\n  <div *ngIf="show">\n    <ion-list *ngFor="let customer of customers$ | async">\n      <ion-item (click)="selectedName(customer._id, customer.name, customer)">{{customer.person.personName.firstName}}</ion-item>\n    </ion-list>\n  </div>\n\n</div>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/components/customer-search/customer-search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_customer_service_customer_service__["a" /* CustomerServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], CustomerSearchComponent);
    return CustomerSearchComponent;
}());

//# sourceMappingURL=customer-search.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerAddServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the CustomerAddServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var CustomerAddServiceProvider = /** @class */ (function () {
    function CustomerAddServiceProvider(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.appntUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionals';
        console.log('Hello CustomerAddServiceProvider Provider');
    }
    CustomerAddServiceProvider.prototype.log = function (message) {
        this.messageService.add("CustomerAddServiceProvider: " + message);
    };
    /** POST: add a new Appointment to the server */
    CustomerAddServiceProvider.prototype.addACustomer = function (event, uid) {
        var _this = this;
        console.log('Service: addACustomer:' + JSON.stringify(event));
        return this.http.post(this.appntUrl + '/' + uid + "/clients/", event, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (event) {
            console.log('EN POST');
            _this.log("added appointment w/ id=" + event._id);
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('addACustomer')));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    CustomerAddServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(result);
        };
    };
    CustomerAddServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */]])
    ], CustomerAddServiceProvider);
    return CustomerAddServiceProvider;
}());

//# sourceMappingURL=customer-add-service.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(512);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return firebaseConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var firebaseConfig = {
    apiKey: "AIzaSyBbM_6gU_MOGQL_Ti64jc3oD8R4aNJgju0",
    authDomain: "ecomminstant.firebaseapp.com",
    databaseURL: "https://ecomminstant.firebaseio.com",
    projectId: "ecomminstant",
    storageBucket: "ecomminstant.appspot.com",
    messagingSenderId: "342856925244"
};
var environment = {
    production: false,
    baseUrl: 'https://ecommercealinstante.herokuapp.com'
    //baseUrl: 'api'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environment__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_user_service_user_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_dragula__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser_animations__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic2_calendar__ = __webpack_require__(867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_screen_orientation__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_components_module__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_customer_search_customer_search__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_custom_event_tittle_formatter_custom_event_tittle_formatter__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_custom_date_formatter_custom_date_formatter__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_service_service_service_service__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_customer_service_customer_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_appointment_service_appointment_service__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_customer_customer__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_schedule_service_schedule_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_preferences_service_preferences_service__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_globals_service_globals_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_exception_service_exception_service__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_customer_add_service_customer_add_service__ = __webpack_require__(506);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import { MbscModule } from '@mobiscroll/angular';



































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_customer_customer__["a" /* CustomerPage */],
                //ScrollCalendarPage,
                __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormsModule */],
                //MbscModule,
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/calendar/calendar.module#CalendarPageModule', name: 'CalendarPage', segment: 'calendar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-detail/customer-detail.module#CustomerDetailPageModule', name: 'CustomerDetailPage', segment: 'customer-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-add/customer-add-modal.module#CustomerAddModalPageModule', name: 'CustomerAddModalPage', segment: 'customer-add-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-modal/customer-modal.module#CustomerModalPageModule', name: 'CustomerModalPage', segment: 'customer-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer/customer.module#CustomerPageModule', name: 'CustomerPage', segment: 'customer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-modal/event-modal.module#EventModalPageModule', name: 'EventModalPage', segment: 'event-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-modal2/event-modal2.module#EventModal2PageModule', name: 'EventModalPage2', segment: 'event-modal2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registration/registration.module#RegistrationPageModule', name: 'RegistrationPage', segment: 'registration', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scroll-calendar/scroll-calendar.module#ScrollCalendarPageModule', name: 'ScrollCalendarPage', segment: 'scroll-calendar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scroll-home/scroll-home.module#ScrollHomePageModule', name: 'ScrollHomePage', segment: 'scroll-home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__environment__["b" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_12_ng2_dragula__["a" /* DragulaModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_14_ionic2_calendar__["a" /* NgCalendarModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */],
                //HttpClientInMemoryWebApiModule,
                //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
                __WEBPACK_IMPORTED_MODULE_17__components_components_module__["a" /* ComponentsModule */],
                // IonicStorageModule.forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__mydb',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                __WEBPACK_IMPORTED_MODULE_12_ng2_dragula__["a" /* DragulaModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_customer_customer__["a" /* CustomerPage */],
                //ScrollCalendarPage,
                __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_user_service_user_service__["a" /* UserServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_12_ng2_dragula__["b" /* DragulaService */],
                __WEBPACK_IMPORTED_MODULE_23__providers_custom_event_tittle_formatter_custom_event_tittle_formatter__["a" /* CustomEventTittleFormatterProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_custom_date_formatter_custom_date_formatter__["a" /* CustomDateFormatterProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_service_service_service_service__["a" /* ServiceServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_customer_service_customer_service__["a" /* CustomerServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_message_service_message_service__["a" /* MessageServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_18__components_customer_search_customer_search__["a" /* CustomerSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_28__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_schedule_service_schedule_service__["a" /* ScheduleServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_preferences_service_preferences_service__["a" /* PreferencesServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_globals_service_globals_service__["a" /* GlobalsServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_33__providers_exception_service_exception_service__["a" /* ExceptionServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_customer_add_service_customer_add_service__["a" /* CustomerAddServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalsServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_logged_class__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the GlobalsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalsServiceProvider = /** @class */ (function () {
    function GlobalsServiceProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.loggedProfessional = new __WEBPACK_IMPORTED_MODULE_2__classes_logged_class__["a" /* LoggedProfessional */];
        console.log('Hello GlobalsServiceProvider Provider');
        this.readFromStorageProfessionalData();
    }
    GlobalsServiceProvider.prototype.ngOnInit = function () {
        this.readFromStorageProfessionalData();
    };
    GlobalsServiceProvider.prototype.setProfessionalLoginData = function (UID, idSchedule, startHour, endHour) {
        this.loggedProfessional.userId = UID;
        this.loggedProfessional.idSchedule = idSchedule;
        this.loggedProfessional.startHour = startHour;
        this.loggedProfessional.endHour = endHour;
    };
    GlobalsServiceProvider.prototype.readFromStorageProfessionalData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready().then(function () {
                _this.storage.get('uid').then(function (uidData) {
                    _this.loggedProfessional.userId = uidData;
                    //console.log('testing of sqlite was ' + uidData);
                    _this.storage.get('idSchedule').then(function (idSched) {
                        _this.loggedProfessional.idSchedule = idSched;
                        resolve();
                    });
                });
            });
        }).then(function () { return _this.loggedProfessional; }, function () { return _this.loggedProfessional; });
    };
    GlobalsServiceProvider.prototype.getLoggedProffessionalData = function () {
        return this.loggedProfessional;
    };
    GlobalsServiceProvider.prototype.reSetProfessionalLoginData = function () {
        this.loggedProfessional.userId = '';
        this.loggedProfessional.idSchedule = '';
    };
    /* Guarda la lista de clientes de un profesional en el cache */
    GlobalsServiceProvider.prototype.getCustomerLocalList = function () {
        return this.loadedCustomers;
    };
    GlobalsServiceProvider.prototype.setCustomerList = function (customerList) {
        this.loadedCustomers = customerList;
        //console.log('Set Customer Global List:' + JSON.stringify(this.loadedCustomers));
    };
    GlobalsServiceProvider.prototype.resetCustomerList = function () {
        this.loadedCustomers = [];
    };
    GlobalsServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], GlobalsServiceProvider);
    return GlobalsServiceProvider;
}());

//# sourceMappingURL=globals-service.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 234,
	"./af.js": 234,
	"./ar": 235,
	"./ar-dz": 236,
	"./ar-dz.js": 236,
	"./ar-kw": 237,
	"./ar-kw.js": 237,
	"./ar-ly": 238,
	"./ar-ly.js": 238,
	"./ar-ma": 239,
	"./ar-ma.js": 239,
	"./ar-sa": 240,
	"./ar-sa.js": 240,
	"./ar-tn": 241,
	"./ar-tn.js": 241,
	"./ar.js": 235,
	"./az": 242,
	"./az.js": 242,
	"./be": 243,
	"./be.js": 243,
	"./bg": 244,
	"./bg.js": 244,
	"./bm": 245,
	"./bm.js": 245,
	"./bn": 246,
	"./bn.js": 246,
	"./bo": 247,
	"./bo.js": 247,
	"./br": 248,
	"./br.js": 248,
	"./bs": 249,
	"./bs.js": 249,
	"./ca": 250,
	"./ca.js": 250,
	"./cs": 251,
	"./cs.js": 251,
	"./cv": 252,
	"./cv.js": 252,
	"./cy": 253,
	"./cy.js": 253,
	"./da": 254,
	"./da.js": 254,
	"./de": 255,
	"./de-at": 256,
	"./de-at.js": 256,
	"./de-ch": 257,
	"./de-ch.js": 257,
	"./de.js": 255,
	"./dv": 258,
	"./dv.js": 258,
	"./el": 259,
	"./el.js": 259,
	"./en-au": 260,
	"./en-au.js": 260,
	"./en-ca": 261,
	"./en-ca.js": 261,
	"./en-gb": 262,
	"./en-gb.js": 262,
	"./en-ie": 263,
	"./en-ie.js": 263,
	"./en-il": 264,
	"./en-il.js": 264,
	"./en-nz": 265,
	"./en-nz.js": 265,
	"./eo": 266,
	"./eo.js": 266,
	"./es": 267,
	"./es-do": 268,
	"./es-do.js": 268,
	"./es-us": 269,
	"./es-us.js": 269,
	"./es.js": 267,
	"./et": 270,
	"./et.js": 270,
	"./eu": 271,
	"./eu.js": 271,
	"./fa": 272,
	"./fa.js": 272,
	"./fi": 273,
	"./fi.js": 273,
	"./fo": 274,
	"./fo.js": 274,
	"./fr": 275,
	"./fr-ca": 276,
	"./fr-ca.js": 276,
	"./fr-ch": 277,
	"./fr-ch.js": 277,
	"./fr.js": 275,
	"./fy": 278,
	"./fy.js": 278,
	"./gd": 279,
	"./gd.js": 279,
	"./gl": 280,
	"./gl.js": 280,
	"./gom-latn": 281,
	"./gom-latn.js": 281,
	"./gu": 282,
	"./gu.js": 282,
	"./he": 283,
	"./he.js": 283,
	"./hi": 284,
	"./hi.js": 284,
	"./hr": 285,
	"./hr.js": 285,
	"./hu": 286,
	"./hu.js": 286,
	"./hy-am": 287,
	"./hy-am.js": 287,
	"./id": 288,
	"./id.js": 288,
	"./is": 289,
	"./is.js": 289,
	"./it": 290,
	"./it.js": 290,
	"./ja": 291,
	"./ja.js": 291,
	"./jv": 292,
	"./jv.js": 292,
	"./ka": 293,
	"./ka.js": 293,
	"./kk": 294,
	"./kk.js": 294,
	"./km": 295,
	"./km.js": 295,
	"./kn": 296,
	"./kn.js": 296,
	"./ko": 297,
	"./ko.js": 297,
	"./ky": 298,
	"./ky.js": 298,
	"./lb": 299,
	"./lb.js": 299,
	"./lo": 300,
	"./lo.js": 300,
	"./lt": 301,
	"./lt.js": 301,
	"./lv": 302,
	"./lv.js": 302,
	"./me": 303,
	"./me.js": 303,
	"./mi": 304,
	"./mi.js": 304,
	"./mk": 305,
	"./mk.js": 305,
	"./ml": 306,
	"./ml.js": 306,
	"./mn": 307,
	"./mn.js": 307,
	"./mr": 308,
	"./mr.js": 308,
	"./ms": 309,
	"./ms-my": 310,
	"./ms-my.js": 310,
	"./ms.js": 309,
	"./mt": 311,
	"./mt.js": 311,
	"./my": 312,
	"./my.js": 312,
	"./nb": 313,
	"./nb.js": 313,
	"./ne": 314,
	"./ne.js": 314,
	"./nl": 315,
	"./nl-be": 316,
	"./nl-be.js": 316,
	"./nl.js": 315,
	"./nn": 317,
	"./nn.js": 317,
	"./pa-in": 318,
	"./pa-in.js": 318,
	"./pl": 319,
	"./pl.js": 319,
	"./pt": 320,
	"./pt-br": 321,
	"./pt-br.js": 321,
	"./pt.js": 320,
	"./ro": 322,
	"./ro.js": 322,
	"./ru": 323,
	"./ru.js": 323,
	"./sd": 324,
	"./sd.js": 324,
	"./se": 325,
	"./se.js": 325,
	"./si": 326,
	"./si.js": 326,
	"./sk": 327,
	"./sk.js": 327,
	"./sl": 328,
	"./sl.js": 328,
	"./sq": 329,
	"./sq.js": 329,
	"./sr": 330,
	"./sr-cyrl": 331,
	"./sr-cyrl.js": 331,
	"./sr.js": 330,
	"./ss": 332,
	"./ss.js": 332,
	"./sv": 333,
	"./sv.js": 333,
	"./sw": 334,
	"./sw.js": 334,
	"./ta": 335,
	"./ta.js": 335,
	"./te": 336,
	"./te.js": 336,
	"./tet": 337,
	"./tet.js": 337,
	"./tg": 338,
	"./tg.js": 338,
	"./th": 339,
	"./th.js": 339,
	"./tl-ph": 340,
	"./tl-ph.js": 340,
	"./tlh": 341,
	"./tlh.js": 341,
	"./tr": 342,
	"./tr.js": 342,
	"./tzl": 343,
	"./tzl.js": 343,
	"./tzm": 344,
	"./tzm-latn": 345,
	"./tzm-latn.js": 345,
	"./tzm.js": 344,
	"./ug-cn": 346,
	"./ug-cn.js": 346,
	"./uk": 347,
	"./uk.js": 347,
	"./ur": 348,
	"./ur.js": 348,
	"./uz": 349,
	"./uz-latn": 350,
	"./uz-latn.js": 350,
	"./uz.js": 349,
	"./vi": 351,
	"./vi.js": 351,
	"./x-pseudo": 352,
	"./x-pseudo.js": 352,
	"./yo": 353,
	"./yo.js": 353,
	"./zh-cn": 354,
	"./zh-cn.js": 354,
	"./zh-hk": 355,
	"./zh-hk.js": 355,
	"./zh-tw": 356,
	"./zh-tw.js": 356
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 533;

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedProfessional; });
var LoggedProfessional = /** @class */ (function () {
    function LoggedProfessional() {
        this.startHour = "9";
        this.endHour = "19";
    }
    return LoggedProfessional;
}());

//# sourceMappingURL=logged-class.js.map

/***/ }),

/***/ 871:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_search_customer_search__ = __webpack_require__(505);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_3__customer_search_customer_search__["a" /* CustomerSearchComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__customer_search_customer_search__["a" /* CustomerSearchComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, userService, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.afAuth = afAuth;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.pages = [
            { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: 'home' },
            { title: 'Mi Agenda', pageName: 'CalendarPage', tabComponent: 'CalendarPage', index: 1, icon: 'calendar' },
            { title: 'Mis Pacientes', pageName: 'CustomerPage', tabComponent: 'CustomerPage', index: 2, icon: 'contacts' },
        ];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();
            splashScreen.hide();
            _this.loginPage = 'LoginPage';
            _this.afAuth.auth.onAuthStateChanged(function (user) {
                if (user)
                    _this.loggedIn = user.email;
            });
        });
    }
    MyApp.prototype.showPlatform = function () {
        var text = 'Corriendo en: ' + this.platform.platforms();
        var alert = this.alertCtrl.create({
            title: 'Home',
            subTitle: text,
            buttons: ['Ok']
        });
        alert.present();
    };
    MyApp.prototype.signOff = function () {
        this.userService.logOut();
        this.loggedIn = '';
        this.nav.push('LoginPage');
    };
    MyApp.prototype.openPage = function (page) {
        var params = {};
        // The index is equal to the order of our tabs inside tabs.ts
        if (page.index) {
            params = { tabIndex: page.index };
        }
        // The active child nav is our Tabs Navigation
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            // Tabs are not active, so reset the root page
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(page.pageName, params);
        }
    };
    MyApp.prototype.isActive = function (page) {
        // Again the Tabs Navigation
        var childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        // Fallback needed when there is no active childnav (tabs not active)
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'login-style',template:/*ion-inline-start:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/app/app.html"*/'<ion-menu [content]="mycontent" persistent="true" >\n  <ion-content>\n    <img src="assets/images/noavatar.png" width="42" height="42" align="middle" style="margin:50px 0px">\n    <p>Hola!</p>\n    {{loggedIn}}\n    <p>Bienvenid@</p>\n    <button ion-button  menuClose detail-none (click)="signOff()">\n      Salir\n    </button>\n\n    <ion-list>\n\n      <ion-item menuClose detail-none *ngFor="let p of pages" (click)="openPage(p)">{{ p.title }}</ion-item>\n\n\n    </ion-list>\n    <ion-label><a href="mailto:ecommercealinstante@gmail.com?subject=Hola, tengo la siguiente sugerencia para la aplicación"\n                  target="_top"><ion-icon name="mail"></ion-icon> Dudas, comentarios, soporte</a>\n\n    </ion-label>\n\n  </ion-content>\n</ion-menu>\n<ion-nav #mycontent [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/taidyygreisly/Documents/Taidy/instantecomm/frontend/ecommCommerce/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomEventTittleFormatterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the CustomEventTittleFormatterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CustomEventTittleFormatterProvider = /** @class */ (function () {
    function CustomEventTittleFormatterProvider(http) {
        this.http = http;
        console.log('Hello CustomEventTittleFormatterProvider Provider');
    }
    CustomEventTittleFormatterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CustomEventTittleFormatterProvider);
    return CustomEventTittleFormatterProvider;
}());

//# sourceMappingURL=custom-event-tittle-formatter.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomDateFormatterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the CustomDateFormatterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CustomDateFormatterProvider = /** @class */ (function () {
    function CustomDateFormatterProvider(http) {
        this.http = http;
        console.log('Hello CustomDateFormatterProvider Provider');
    }
    CustomDateFormatterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CustomDateFormatterProvider);
    return CustomDateFormatterProvider;
}());

//# sourceMappingURL=custom-date-formatter.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__globals_service_globals_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the CustomerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var CustomerServiceProvider = /** @class */ (function () {
    function CustomerServiceProvider(http, messageService, globalsServiceProvider) {
        this.http = http;
        this.messageService = messageService;
        this.globalsServiceProvider = globalsServiceProvider;
        this.customerUrl = __WEBPACK_IMPORTED_MODULE_5__environment__["a" /* environment */].baseUrl + '/professionals/';
        //console.log('Hello CustomerServiceProvider Provider');
    }
    CustomerServiceProvider.prototype.log = function (message) {
        this.messageService.add("HeroService: " + message);
    };
    /* Gets customer Lists and also add them to the global array of customer for performance */
    CustomerServiceProvider.prototype.getCustomers = function (professionalUID) {
        var _this = this;
        var finalURL = this.customerUrl + professionalUID + '/clients/';
        //console.log('Customer-finalURL:' + finalURL);
        return this.http.get(finalURL, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (data) { return _this.globalsServiceProvider.setCustomerList(data); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('getCustomers', [])));
    };
    CustomerServiceProvider.prototype.searchCustomers = function (term, professionalUID) {
        var _this = this;
        //console.log('En Busqueda:' + term);
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])([]);
        }
        var finalURL = this.customerUrl + professionalUID + '/clients/';
        return this.http.get("" + finalURL).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (_) { return _this.log("found heroes matching \"" + term + "\""); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError('searchCustomers', [])));
    };
    CustomerServiceProvider.prototype.getCustomer = function (id) {
        var _this = this;
        var _id = id;
        var url = this.customerUrl + "/" + id;
        //console.log('Get Customer by Id URL:' + url);
        /* Fist query de customer in the local Array */
        var localList = this.globalsServiceProvider.getCustomerLocalList();
        //console.log('Local Customer by List:' + JSON.stringify(localList));
        var customerLocal = localList.find(function (customer) { return customer._id === id; });
        //console.log('Local Customer Single:' + JSON.stringify(customerLocal));
        if (customerLocal) {
            var customerLocal$ = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(customerLocal);
            //console.log('Encontrado Cache' + JSON.stringify(customerLocal$));
            return customerLocal$;
        }
        return this.http.get(url).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (_) { return _this.log("fetched customer id=" + _id); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError("getHero id=" + _id)));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    CustomerServiceProvider.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            //console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(result);
        };
    };
    CustomerServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__message_service_message_service__["a" /* MessageServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__globals_service_globals_service__["a" /* GlobalsServiceProvider */]])
    ], CustomerServiceProvider);
    return CustomerServiceProvider;
}());

//# sourceMappingURL=customer-service.js.map

/***/ })

},[507]);
//# sourceMappingURL=main.js.map