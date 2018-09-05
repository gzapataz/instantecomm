import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  }

  registrationPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserServiceProvider) {
    this.registrationPage = 'RegistrationPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signOn() {
    if (!this.login.email || !this.login.password) {
      this.userService.displayAlert('Error',  "Ingresar usuario y password");
    }
    else {
      this.userService.logOn(this.login)
        .then(returned => {
          if (this.userService.success) {
            this.navCtrl.push(HomePage);
          }
          else {
            this.login.email = '';
            this.login.password = '';
          }

        })
    }
  }

}
