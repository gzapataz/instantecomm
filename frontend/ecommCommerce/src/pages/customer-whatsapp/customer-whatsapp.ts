import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CustomerClass, Person} from "../../classes/customer-class";
import {CustomerUpdateDetailProvider} from "../../providers/customer-update-detail/customer-update-detail";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.mobile = this.navParams.get('mobile');

  }

  ionViewDidLoad() {

  }

  ngOnInit() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
