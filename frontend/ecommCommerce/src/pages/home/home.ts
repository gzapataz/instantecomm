import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private userService: UserServiceProvider) {
    this.loginPage = 'LoginPage';
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user)
        this.loggedIn = user.email;
    });
  }

  signOff() {
    this.userService.logOut();
    this.loggedIn = '';
  }

}
