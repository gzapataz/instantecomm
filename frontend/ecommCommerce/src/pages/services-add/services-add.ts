import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { GlobalsServiceProvider } from "../../providers/globals-service/globals-service";
import { ServiceClass } from "../../classes/service-class";
import { AuthenticationServiceProvider } from "../../providers/authentication-service/authentication-service";


/**
 * Generated class for the ServicesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-add',
  templateUrl: 'services-add.html',
})
export class ServicesAddPage implements OnInit {

  averageTime = 0;
  loggedUser;
  accion = 'Adicionar';
  service: ServiceClass = new ServiceClass();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthenticationServiceProvider,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private serviceService: ServiceServiceProvider,
              private globalService: GlobalsServiceProvider) {
    if (this.navParams.get('service')) {
      this.service = this.navParams.get('service');
      this.accion = 'Actualizar';
    }
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    console.log('usuario:' + JSON.stringify(this.loggedUser));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesAddPage');
  }


  cancel() {
    this.viewCtrl.dismiss();
  }


  save() {
    console.log('Servicio a Salvar:' + JSON.stringify(this.service))
    if(!this.service.name || !this.service.averageTime)
    {
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: "Favor ingresar los datos obligatorios",
        buttons: ['OK']
      });
      theAlert.present();
    } else{
      this.viewCtrl.dismiss(this.service);
    }

  }

}
