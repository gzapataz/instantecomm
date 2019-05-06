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
    this.textData = 'Buenas+tardes+Sr%28a%29%3A+' + this.customer['firstName'] + '%2C+este+mensaje+es+enviado+desde+el+consultorio+del+%28la%29+Dr%28a%29%3A+' + this.professional + '.++Por+este+medio+le+recordaremos+oportunamente+sus+citas+y%2Fo+procedimientos+programados.++Con+el+fin+de+activar+el+servicio%2C+por+favor+presione+sobre+el+siguiente+texto+en+azul%3A+https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido'
        }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
