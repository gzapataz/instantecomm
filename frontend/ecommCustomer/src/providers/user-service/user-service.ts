import { Injectable } from '@angular/core';

import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserServiceProvider {
  items: any;
  success: boolean;

  constructor(public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private storage: Storage, private afDataBase: AngularFireDatabase) {
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
}
