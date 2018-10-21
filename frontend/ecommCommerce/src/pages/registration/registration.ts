import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from "../home/home";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { UserServiceProvider } from "../../providers/user-service/user-service";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  reg = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  displayAlert(alertTitle, alertSub) {
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  registerAccoun() {
    if (this.reg.password != this.reg.password2) {
      this.displayAlert('Problema con el Password', 'No hay coincidencia con los passwords');
      this.reg.password = '';
      this.reg.password2 = '';
    }
    else {
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.reg.email, this.reg.password)
        .then(res => this.regSuccess(res))
        .catch(err => this.displayAlert('Error!', err));
    }
  }

  regSuccess(result) {
    this.userService.logOn(this.reg)
      .then(res => this.navCtrl.push(TabsPage));
  }

}
