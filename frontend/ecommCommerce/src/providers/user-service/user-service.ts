import { Injectable } from '@angular/core';

import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {ProfessionalClass} from "../../classes/ProfessionalClass";
import {GlobalsServiceProvider} from "../globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";
import {environment} from "../../environment";
import {Person} from "../../classes/customer-class";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserServiceProvider {
  items: any;
  success: boolean = true;

  userUrl = environment.baseUrl + '/professionals/';



  constructor(public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              public storage: Storage, private afDataBase: AngularFireDatabase,public http: HttpClient,
              private globalService: GlobalsServiceProvider) {
    this.items = this.afDataBase.list("/users")
  }

  createDBUser(user): Observable<LoggedProfessional> {
    console.log('Prof->Creacion:' + JSON.stringify(user));
    return this.http.post<Person>(this.userUrl, user, httpOptions).pipe(
      tap((user: any) => {
        console.log('EN POST USER CREATED');
      }),
      catchError(this.handleError<LoggedProfessional>('addUser'))
    );
  }

  updateDBUser(user): Observable<LoggedProfessional> {
    //console.log('Prof->Creacion:' + JSON.stringify(user));
    return this.http.put<Person>(this.userUrl, user, httpOptions).pipe(
      tap((msg: any) => {
        console.log('EN POST->Upd:' + JSON.stringify(user));
        this.getValuesProfessional(user)
      }),
      catchError(this.handleError<Person>('addUser'))
    );
  }

  deleteDBUser(user): Observable<LoggedProfessional> {
    console.log('Prof->Delete:' + user.uid);
    let delUrl = this.userUrl + '/' + user.uid;
    console.log('URL DELETE:' + this.userUrl);
    return this.http.delete<Person>(delUrl, httpOptions).pipe(
      tap((user: any) => {
        this.afAuth.auth.currentUser.delete().then(() => {
          this.logOut();
          console.log('EN delete->Upd:' + JSON.stringify(user));

        })
      }),
      catchError(this.handleError<Person>('addUser'))
    );
  }



  displayAlert(alertTitle, alertSub) {
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(loggedOut => {
        this.displayAlert('Logged Out', null);
        this.storageControl('delete');
        this.storageControl('delete', 'idSchedule');
        this.storageControl('delete', 'uid');
        this.storageControl('delete', 'startHour');
        this.storageControl('delete', 'endHour');
        this.storageControl('delete', 'usrJson');
        this.globalService.reSetProfessionalLoginData();
      })
      .catch(err => this.displayAlert('Error Logged Out', err));
  }

  logOn(user): Promise<any> {
    return new Promise((resolve, reject ) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
          console.log('Logon1');
          this.storageControl('get', 'uid')
            .then( returned => {
              console.log('Logon2:' +JSON.stringify(returned));
              if (!returned) {
                console.log('Logon3:' +JSON.stringify(returned));
                this.getUserData(result.user.uid.toString()).subscribe(
                  result => {
                    if (result != undefined) {
                      this.getValuesProfessional(result)
                      //console.log('GET getValuesProfessional' + JSON.stringify(result))
                      this.success = true;
                      resolve(result);
                    }
                  },
                  error => this.handleError('getProfessional', [])
                );
                this.saveNewUser(user);
              }
              else {
                console.log('Con datos de usuario else:' + JSON.stringify(returned))
                this.success = true;
                resolve(result);
              }
            });
        }).catch(function(error) {
          return;
        });

    });

  }

  sendPasswordReset(email): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      return true;
    }).catch(err => {
      this.success = false;
      this.displayAlert("Error", err )
      return false;
    });
  }

  //No usar
  oldlogOn(user)  {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        console.log('Logon1');
        this.storageControl('get', 'uid')
          .then( returned => {
            console.log('Logon2:' +JSON.stringify(returned));
            if (!returned) {
              console.log('Logon3:' +JSON.stringify(returned));
              this.getUserData(result.user.uid.toString()).subscribe(
                result => { this.getValuesProfessional(result)
                                  console.log('GET getValuesProfessional' + JSON.stringify(result))
                                },
                error => this.handleError('getProfessional', [])
              );
              this.saveNewUser(user);
            }
            else {
              console.log('Con datos de usuario else:' + JSON.stringify(returned))
            }
          });
        this.success = true;
        return result;
      })
      .catch(err => {
        this.success = false;
        this.displayAlert("Error", "Usuario no logueado" + err )
        return err;
      });



  }


  saveNewUser(user) {
    let userObj = {
      username: user.email,
      name:user.name,
      lastName: user.lastName,
      creation: new Date().toDateString(),
      lastlogging: new Date().toLocaleString(),
      id: ''
    }
    this.items.push({
      username: user.email,
      name:user.name,
      lastName: user.lastName,
      creation: userObj.creation,
      lastloggin: userObj.lastlogging
    })
      .then(res => {
        userObj.id = res.key;
        return this.storageControl('set', user.email, userObj);

      })
      .catch( err => {
        this.displayAlert('Error Storage', err);
        console.log('Error user-service-saveNewUser: ' + err);
      })
    return this.storageControl('get');
  }

  storageControl(action, key?, value?) {
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

  }

  getUserData(uid:string): Observable<any> {

    return this.http.get<any>("https://ecommercealinstante.herokuapp.com/professionals/?uid="+uid, httpOptions)
      .pipe(
        map(data =>
          { <ProfessionalClass[]>data;
            delete data.services;
            delete data.clients;
            delete data.professionalSchedule.appointments;
            delete data.professionalSchedule.exceptions;

            return data;
          }),
        catchError(this.handleError('getProfessional', [])))

   ;
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getValuesProfessional(jsonProfesional:JSON){
    var obj = jsonProfesional['person'];
    //console.log('guardandoPersona:' + JSON.stringify(obj))
    for(var key in obj)
    {
      console.log("key: " + key + ", value: " + obj[key])
      this.storageControl('set', key.toString(), obj[key]);

    }
    //console.log('Horas:' + jsonProfesional['startHour'] + ' Y ' + jsonProfesional['endHour'])
    console.log('jsonProfesional:' + JSON.stringify(jsonProfesional));
    var obj2 = jsonProfesional['professionalSchedule'];
    this.storageControl('set', 'usrJson', jsonProfesional);
    this.storageControl('set', 'idSchedule', obj2['idSchedule']);
    this.storageControl('set', 'startHour', jsonProfesional['startHour']);
    this.storageControl('set', 'endHour', jsonProfesional['endHour']);
    this.storageControl('set', 'uid', jsonProfesional['uid']);

    this.storage.ready().then(() => {
      this.storage.get('uid').then((uidData) =>{
          this.storage.get('idSchedule').then (idSched => {
            this.storage.get('startHour').then (startHour => {
              this.storage.get('endHour').then (endHour => {
                this.globalService.setProfessionalLoginData(uidData, idSched, startHour, endHour);
                console.log('LoggedSingleltonUpdates ' + JSON.stringify(this.globalService.getLoggedProffessionalData())); //this is always null, even though I just set it to true.
              });
            });
          });
        });
    });
}
}
