import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CustomerClass, Person} from "../../classes/customer-class";
import {CustomerUpdateDetailProvider} from "../../providers/customer-update-detail/customer-update-detail";

import { VCard } from 'ngx-vcard';
import {LoggedProfessional} from "../../classes/logged-class";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {ProfessionalClass} from "../../classes/ProfessionalClass";


/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-whatsapp',
  templateUrl: 'customer-whatsapp.html',
})
export class CustomerWhatsappPage implements OnInit {

  mobile:string;
  customer: any;

  loggedUser: LoggedProfessional;
  professional: string;

  vcard: VCard = {
    name: {
      firstNames: 'John',
      lastNames: 'Doe'
    }
  }

  textData: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private globalService: GlobalsServiceProvider) {
    this.mobile = this.navParams.get('mobile');
    this.customer = this.navParams.get('customer');
    this.professional = this.navParams.get('professional');
    console.log('this.mobile:' + this.mobile)
    console.log('this.customer:' + JSON.stringify(this.customer))
    console.log('this.professional:' + this.professional)
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.textData = 'Buenas%20tardes%20Sr(a)%3A%20' + this.customer['firstName'] + '%20' + this.customer['lastName']  + '%20este%20mensaje%20es%20enviado%20desde%20el%20consultorio%20del%20Dr(a)%3A%20' + this.professional + '%20%2C%20para%20poderlo%20tener%20al%20tanto%20de%20sus%20citas%20y%20procedimientos%20de%20inter%C3%A9s.%20Para%20poder%20activar%20el%20servicio%20por%20favor%20env%C3%ADe%20el%20mensaje%20por%20whatsapp%20con%20la%20palabra%20%22Recibido%22%20al%20n%C3%BAmero%20de%20nuestro%20servicio%20presionando%20el%20siguiente%20link%3A%20%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
