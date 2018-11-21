import {Component, Input} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AbstractControl, Validators, ValidationErrors, FormGroup, FormControl } from '@angular/forms'
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

  myForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  @Input()
  email: string | boolean


  login = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  }

  registrationPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
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
          //console.log('RETORNO LOGGED: ' + JSON.stringify(returned))
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



  forgotPwd(email) {
    console.log('email:' + this.login.email)
    if (this.login.email == "" || this.login.email == null || this.login.email == undefined) {
      let theAlert = this.alertCtrl.create({
        title: "eMail",
        subTitle: "Por favor ingrese el correo con el que está registrado",
        buttons: ['OK']
      });
      theAlert.present();
      return;
    }
    try {
      this.userService.sendPasswordReset(this.login.email).then(data => {
        console.log('DATA:' + data)
        if (data) {
          let theAlert = this.alertCtrl.create({
            title: "Reinicio de Password",
            subTitle: "Hemos enviado un mail a " + this.login.email + " para el reingreso del password",
            buttons: ['OK']
          });
          theAlert.present();
          console.log('Enviado reset Pwd')
        }
      })
    } catch (e) {
      
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('ERRORRRRR de CORREO')
    return null;

  }

}
