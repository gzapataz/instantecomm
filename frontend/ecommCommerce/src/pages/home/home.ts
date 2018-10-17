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


  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private userService: UserServiceProvider,
              private alertCtrl: AlertController, private platform: Platform) {

  }


}
