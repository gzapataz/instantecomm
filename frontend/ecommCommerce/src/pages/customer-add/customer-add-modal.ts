import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Person} from "../../classes/customer-class";
import {LoggedProfessional} from "../../classes/logged-class";
import {CustomerAddServiceProvider} from "../../providers/customer-add-service/customer-add-service";
import {RestApiProvider} from '../../providers/countries-service/countries-service';
//import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

@IonicPage()
@Component({
  selector: 'page-customer-add-modal',
  templateUrl: 'customer-add-modal.html',
})
export class CustomerAddModalPage implements OnInit {

  persona = {
    personName: {
      firstName: '',
      lastName: '',
    },
    //idType: null,
    //birthdate: null,
    //gender: null,
    phone: '',
    mobile: '',
    email: '',
    //identification: null,
    //address: null
  }

  codigo:string;

  professional: LoggedProfessional;
  contactsfound = []

  person: Person;
  countries: string[];
  errorMessage: string;


  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private customerAddServiceProvider: CustomerAddServiceProvider,
              private alertCtrl: AlertController, public rest: RestApiProvider,
              //private contacts: Contacts
              ) {
  }

  ngOnInit() {
    this.professional = this.navParams.get('professional');
  //  console.log(this.professional);
    this.getCountries();
    this.codigo='57';
/*
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
      this.contactsfound = contacts;
    })
*/
  }


  cancel() {
    this.viewCtrl.dismiss(this.person);
  }


  save() {

    // @ts-ignore
// @ts-ignore
    this.person = this.persona;

    //console.log(this.person);
    console.log('this.person.personName.firstName' + this.person.personName.firstName);
    console.log('this.person.personName.lastName' + this.person.personName.lastName);
    console.log('this.person.mobile' + this.person.mobile);
    console.log('this.person.email' + this.person.email);

    if (!this.person.personName.firstName || !this.person.personName.lastName || !this.person.mobile || !this.person.email) {
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: "Por favor ingresa los datos de tu paciente",
        buttons: ['OK']
      });
      theAlert.present();
    } else {

      if (!this.person.phone) {
        this.person.phone = "00";
      }

      this.person.mobile=this.codigo+this.persona.mobile;
      this.person.address
      this.customerAddServiceProvider.addACustomer(this.person, this.professional.userId).subscribe(data => {
        console.log('1Datos Salvados:' + JSON.stringify(data));
        this.cancel();
      });
    }


  }
  getCountries() {
    this.rest.getCountries()
      .subscribe(
        countries => this.countries = countries,
        error =>  this.errorMessage = <any>error);
  }

}
