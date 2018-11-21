import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ViewController} from 'ionic-angular';

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
  loggedProfessional

  action: String = 'Registrarse';

  reg = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private userService: UserServiceProvider) {
      if (this.navParams.get('professional')) {
        this.loggedProfessional = this.navParams.get('professional');
        console.log('COmpleto:' + JSON.stringify(this.loggedProfessional))
        this.professional = this.loggedProfessional.jsonProfessional.person;
        this.professional.uid = this.loggedProfessional.userId;
        this.professional.startHour = this.loggedProfessional.startHour;
        this.professional.endHour = this.loggedProfessional.endHour;
        console.log('Professional:' + JSON.stringify(this.professional))
        this.action = 'Actualizar';
      }
      else {
        this.professional.personName = new PersonName();
      }
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

  updateAccount() {
    delete this.professional['email'];
    console.log("Update:" + JSON.stringify(this.professional))
    this.userService.updateDBUser(this.professional).subscribe(data => {
      console.log("UpdatedData:" + JSON.stringify(data))
      this.viewCtrl.dismiss();
    })
  }


  regSuccess(result) {
    console.log("result:" + JSON.stringify(result))
    this.professional.uid = result.user.uid;
    console.log("this.professional:" + JSON.stringify(this.professional))

    this.userService.createDBUser(this.professional).subscribe(data => {
      this.userService.logOn(this.reg)
        .then(res => this.navCtrl.push(TabsPage));
    })
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  deleteUser() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Esta opción borra físicamente su cuenta y toda su información relacionada: Citas, Pacientes, Servicios etc. Seleccione canclar para no continuar o eliminar para proseguir con el borrado',
      buttons: [{text: 'Cancelar'},
        { text: 'Eliminar',
          handler: () => {
            this.userService.deleteDBUser(this.professional).subscribe(data => {
              console.log("deleted:" + JSON.stringify(data))
              this.viewCtrl.dismiss();
              this.navCtrl.push('LoginPage')

            })
          }
        }]
    })
    alert.present();
  }
}
