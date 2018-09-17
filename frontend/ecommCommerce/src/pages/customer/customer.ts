import {Component, OnInit} from '@angular/core';
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerClass} from "../../classes/customer-class";

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage implements OnInit {

  myCustomers: CustomerClass[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService: CustomerServiceProvider) {
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(data => this.myCustomers = data);
  }

  ngOnInit() {
    this.getCustomers();
  }

  customerSelected(customer) {
    this.navCtrl.push('CustomerDetailPage', {customer: customer});
    console.log(`Clicked customer:` + customer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  startChat(mobile) {
  }

}
