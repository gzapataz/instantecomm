import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerClass} from "../../classes/customer-class";

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage implements OnInit {

  title = '';
  customer: CustomerClass;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  ngOnInit() {
    this.customer = this.navParams.get('customer');
    console.log('Detail:' + JSON.stringify(this.customer));
    this.title = this.customer.person.personName.firstName + ' ' + this.customer.person.personName.lastName;

  }
}
