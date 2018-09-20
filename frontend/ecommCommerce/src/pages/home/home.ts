import { Component } from '@angular/core';
import {AlertController, NavController, Platform } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { UserServiceProvider } from "../../providers/user-service/user-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage: any;
  loggedIn: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private userService: UserServiceProvider,
              private alertCtrl: AlertController, private platform: Platform) {
    this.loginPage = 'LoginPage';
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user)
        this.loggedIn = user.email;
    });
  }

  showPlatform() {
    let text = 'Corriendo en: ' + this.platform.platforms();
    let alert = this.alertCtrl.create({
      title: 'Home',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  signOff() {
    this.userService.logOut();
    this.loggedIn = '';
  }

}
