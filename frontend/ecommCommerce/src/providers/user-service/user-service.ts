import { Injectable } from '@angular/core';

import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {ProfessionalClass} from "../../classes/ProfessionalClass";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserServiceProvider {
  items: any;
  success: boolean;



  constructor(public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private storage: Storage, private afDataBase: AngularFireDatabase,public http: HttpClient) {
    this.items = this.afDataBase.list("/users")
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
      })
      .catch(err => this.displayAlert('Error Logged Out', err));
  }

  logOn(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.storageControl('get', user.email)
          .then( returned => {
            if (!returned) {
              this.getUserData(result.user.uid.toString()).subscribe(
                result => this.getValuesProfessional(result),
                error => this.handleError('getProfessional', [])
              );
              this.saveNewUser(user);
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
      .pipe(catchError(this.handleError('getProfessional', [])))
      .map(data => <ProfessionalClass[]>data)
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
    for(var key in obj)
    {
      console.log("key: " + key + ", value: " + obj[key])
      this.storage.ready().then(() => {
         this.storageControl('set', key, obj[key]);
      })
    }
    this.storage.ready().then(() => {

      console.log("key almacenada creationDate value almacenado "+ this.storageControl('get','creationDate'));

    })
    
  }
}
