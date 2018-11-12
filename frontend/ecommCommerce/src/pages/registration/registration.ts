import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { UserServiceProvider } from "../../providers/user-service/user-service";
import {TabsPage} from "../tabs/tabs";
import { ProfessionalClass } from "../../classes/ProfessionalClass";
import {Person, PersonName} from "../../classes/customer-class";

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

  professional: ProfessionalClass = new ProfessionalClass();

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
    this.professional.personName = new PersonName();
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

  registerAccount() {
    if (this.reg.password != this.reg.password2) {
      this.displayAlert('Problema con el Password', 'No hay coincidencia con los passwords');
      this.reg.password = '';
      this.reg.password2 = '';
    }
    else {
      this.reg.email = this.professional.email;
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.professional.email, this.reg.password)
        .then(res => this.regSuccess(res))
        .catch(err => this.displayAlert('Error!', err));
    }
  }

  regSuccess(result) {
    //console.log("result:" + JSON.stringify(result))
    this.professional.uid = result.user.uid;
    //console.log("this.professional:" + JSON.stringify(this.professional))

    this.userService.createDBUser(this.professional).subscribe(data => {
      this.userService.logOn(this.reg)
        .then(res => this.navCtrl.push(TabsPage));
    })
  }
}
