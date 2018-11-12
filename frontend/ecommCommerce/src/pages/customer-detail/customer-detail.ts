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
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage implements OnInit {


  persona = {
    _id: '',
    personName:{
      firstName: '',
      lastName: '',
    },
    idType: "Cédula",
    birthdate:Date,
    gender: '',
    phone: '',
    mobile: '',
    email:'',
    identification:'',
    address:''
  }


  person: Person;
  customer: CustomerClass;
  profesionalID: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public customerUpdateDetailProvider: CustomerUpdateDetailProvider) {
    this.customer = this.navParams.get('customer');
    this.profesionalID = this.navParams.get('profesionalID');
    console.log('Detail:' + JSON.stringify(this.customer) + this.profesionalID);

    if (this.customer != undefined) {

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

  save() {


    // @ts-ignore
    this.person=this.persona;
    this.person._id=this.customer.person._id;
    this.person.personName.firstName = this.customer.person.personName.firstName;
    this.person.personName.lastName = this.customer.person.personName.lastName;
    this.person.idType = this.customer.person.idType;
    this.person.identification = this.customer.person.identification;
    this.person.gender = this.customer.person.gender;
    this.person.phone = this.customer.person.phone;
    this.person.mobile = this.customer.person.mobile;
    this.person.email=this.customer.person.email;
    this.person.address=this.customer.person.address;
    this.customerUpdateDetailProvider.updateCustomer(this.person, this.profesionalID).subscribe(data => {
      console.log('Datos Salvados:' + JSON.stringify(data));
      this.cancel();
    });


  }
}
