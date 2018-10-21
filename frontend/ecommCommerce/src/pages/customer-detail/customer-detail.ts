import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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


  customer: CustomerClass;
  name='';
  email='';
  phone='';
  mobile='';
  gender='';


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.customer = this.navParams.get('customer');
    console.log('Detail:' + JSON.stringify(this.customer));

    if(this.customer!=undefined) {

      this.name = this.customer.person.personName.firstName + ' ' + this.customer.person.personName.lastName;
      this.email = this.customer.person.email;
      this.phone = this.customer.person.phone;
      this.mobile = this.customer.person.mobile;
      this.gender = this.customer.person.gender;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  ngOnInit() {

    }
  cancel() {
    this.viewCtrl.dismiss();
  }
}
