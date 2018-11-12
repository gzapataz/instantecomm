import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { GlobalsServiceProvider } from "../../providers/globals-service/globals-service";
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";


/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage implements OnInit {

  servicesAvail = [];
  loggedUser;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private servicesService: ServiceServiceProvider,
              private authService: AuthenticationServiceProvider,
              private globalService: GlobalsServiceProvider) {
  }

  ionViewCanEnter() {
    console.log('Validando Permisos');
    if (!this.authService.isAuthenticated()) {
      let alert = this.alertCtrl.create({
        title: 'Errro de Ingreso',
        subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
        buttons: ['Dismiss']
      })
      alert.present();
      this.navCtrl.pop();
      this.navCtrl.push('LoginPage');
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    console.log('usuario:' + JSON.stringify(this.loggedUser));

    if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {

    } else {
      this.getServices(this.loggedUser.userId);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  getServices(professionalUID) {
    this.servicesService.getServices(professionalUID).subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }


  serviceSelected(theService) {

    let modal = this.modalCtrl.create('ServicesAddPage', {service: theService});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let serviceData = data;
        this.servicesService.updateService(this.loggedUser.userId, serviceData).subscribe(data => {
          serviceData._id = data._id;
        });
      }

    });
  }

  addService() {
    let modal = this.modalCtrl.create('ServicesAddPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let serviceData = data;
        this.servicesService.addService(this.loggedUser.userId, serviceData).subscribe(data => {
          serviceData._id = data._id;
          this.servicesAvail.push(serviceData);
        });
      }

    });
  }

}
