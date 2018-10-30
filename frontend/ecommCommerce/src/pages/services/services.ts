import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { GlobalsServiceProvider } from "../../providers/globals-service/globals-service";


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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicesService: ServiceServiceProvider,
              private globalService: GlobalsServiceProvider) {
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

  serviceSelected(service) {

  }

}
