import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
    address:'',
    channels: ['WhatsApp']
  }

  idTypes = [ {code: 'CEDULA', name: 'Cédula'},
              {code: 'TARJETA_IDENTIDAD', name: 'Tarjeta de Identidad'},
              {code: 'PASAPORTE', name: 'Pasaporte'},
              {code: 'CEDULA_EXTRANJERIA', name: 'Cédula Extranjerīa'},
              {code: 'REGISTRO_CIVIL', name: 'Registro Civil'},

  ];

  contactPref = [ {code: 'WhatsApp', name: 'WhatsApp'},
    {code:'Sms', name: 'Mensaje de Texto'},
    {code:'Email', name: 'eMail'}];

  person: Person;
  customer: CustomerClass;
  profesionalID: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public customerUpdateDetailProvider: CustomerUpdateDetailProvider) {
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

  delete() {
    this.customerUpdateDetailProvider.deleteCustomer(this.customer, this.profesionalID).subscribe(data => {
      console.log('Datos Eliminados:' + JSON.stringify(data));
      this.cancel();
    });
  }

  onChangeTel(val) {
    if (val.substr(0, 2) == '57' && val.length != 12 || val.substr(0, 2) != '57' && val.length < 11) {
      let theAlert = this.alertCtrl.create({
        title: "Dígitos del Teléfono",
        subTitle: "El teléfono celular debe tener 10 dígitos",
        buttons: ['OK']
      });
      theAlert.present();
    }
  }

  save() {

    var subTitle;
    // @ts-ignore
    this.person=this.persona;
    this.person._id=this.customer._id;
    this.person.personName.firstName = this.customer.person.personName.firstName;
    this.person.personName.lastName = this.customer.person.personName.lastName;
    this.person.idType = this.customer.person.idType;
    this.person.identification = this.customer.person.identification;
    this.person.gender = this.customer.person.gender;
    this.person.phone = this.customer.person.phone;
    this.person.mobile = this.customer.person.mobile;
    this.person.email=this.customer.person.email;
    this.person.address=this.customer.person.address;
    this.person.channels = this.customer.person.channels;

    console.log('Person:'+ JSON.stringify(this.person));

    if (this.person.personName.firstName == "" || this.person.personName.lastName =="" || this.person.mobile == "" || ( this.person.email == "" && this.person.channels == 'Email' )) {
      if (!this.person.email && this.person.channels == 'Email') {
        subTitle = 'El mail es obligatorio cuando se selecciona eMail en las notificaciones masivas'
      }
      else {
        subTitle = 'Revise los datos incompletos: Nombre, Apellido, Teléfono Celular '
      }
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: subTitle,
        buttons: ['OK']
      });
      theAlert.present();
    } else {

      this.customerUpdateDetailProvider.updateCustomer(this.person, this.profesionalID).subscribe(data => {
        console.log('Datos Salvados:' + JSON.stringify(data));
        this.cancel();
      });
    }

  }
}
