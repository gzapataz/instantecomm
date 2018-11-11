import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Person } from "../../classes/customer-class";
import {LoggedProfessional} from "../../classes/logged-class";
import {CustomerAddServiceProvider} from "../../providers/customer-add-service/customer-add-service";

@IonicPage()
@Component({
  selector: 'page-customer-add-modal',
  templateUrl: 'customer-add-modal.html',
})
export class CustomerAddModalPage implements OnInit {

  persona = {
    personName:{
      firstName: '',
      lastName: '',
    },
    idType: "Cédula",
    birthdate:Date,
    gender: 'Femenino',
    phone: '',
    mobile: '',
    email:'',
    identification:'',
    address:''
    }


professional: LoggedProfessional;


  person:Person;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private customerAddServiceProvider:CustomerAddServiceProvider,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.professional = this.navParams.get('professional');
    console.log(this.professional);
  }


  cancel() {
    this.viewCtrl.dismiss(this.person);
  }


  save() {

    // @ts-ignore
    this.person=this.persona;
    console.log(this.person);
    if(!this.person.personName.firstName||!this.person.personName.lastName||!this.person.mobile||!this.person.identification||!this.person.email
    ||!this.person.idType){
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: "Por favor ingresa los datos de tu paciente",
        buttons: ['OK']
      });
      theAlert.present();
    }else{

      if(this.person.phone){
        this.person.phone="00";
      }
      else if(this.person.address){
        this.person.address="baker";
      }
      this.customerAddServiceProvider.addACustomer(this.person,this.professional.userId).subscribe(data => {
        console.log('Datos Salvados:' + JSON.stringify(data));
        this.cancel();
      });
    }


  }

}
