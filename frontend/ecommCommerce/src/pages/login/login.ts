import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { TabsPage } from "../tabs/tabs";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";

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
              private userService: UserServiceProvider,
              private globalService: GlobalsServiceProvider) {
    this.registrationPage = 'RegistrationPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signOn() {
    if (!this.login.email || !this.login.password) {
      this.userService.displayAlert('Error',  "Ingresar correo electronico y password");
    }
    else {
      this.userService.logOn(this.login)
        .then(returned => {
          console.log('RETORNO LOGGED: ' + JSON.stringify(returned))
          if (this.userService.success) {
            this.globalService.readFromStorageProfessionalData().then( professionalData => {
              console.log('DisparadoLOGIN0:' + JSON.stringify(professionalData))
              console.log('Login Terminado')
              this.navCtrl.push(TabsPage);
            });
          }
          else {
            console.log('elese error');
            this.login.email = '';
            this.login.password = '';
          }

        })
    }
  }

}
