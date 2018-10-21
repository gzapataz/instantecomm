import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppointmentServiceProvider} from "../../providers/appointment-service/appointment-service";
import { PersonName, Person } from "../../classes/customer-class";
import {Observable} from "rxjs";
import {map, filter} from "rxjs/operators";
import {observableToBeFn} from "rxjs/testing/TestScheduler";
import {LoggedProfessional} from "../../classes/logged-class";
import {CustomerAddServiceProvider} from "../../providers/customer-add-service/customer-add-service";
import {LoginPage} from "../login/login";

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
    gender: '',
    phone: '',
    mobile: '',
    email:'',
    identification:'',
    }


professional: LoggedProfessional;


  person:Person;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private customerAddServiceProvider:CustomerAddServiceProvider,
              private alertCtrl: AlertController) {
    this.professional = this.navParams.get('professional');

    console.log(this.professional);

  }

  ngOnInit() {
    console.log('Me volvi a disparar');
  }


  cancel() {

    this.viewCtrl.dismiss(this.person);
    location.reload();
  }


  save() {

    // @ts-ignore
    this.person=this.persona;
    console.log(this.person);
    if(!this.person.personName.firstName||!this.person.personName.lastName||!this.person.gender||!this.person.email||!this.person.mobile
    ){
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: "Por favor ingresa los datos de tu paciente",
        buttons: ['OK']
      });
      theAlert.present();
    }else{
      this.customerAddServiceProvider.addACustomer(this.person,this.professional.userId).subscribe(data => {
        console.log('Datos Salvados:' + JSON.stringify(data));
        /*let theAlert = this.alertCtrl.create({
          title: "Creacion de cliente",
          subTitle: JSON.stringify(data),
          buttons: ['OK']
        });
        theAlert.present();*/
        this.viewCtrl.dismiss();
      });
    }


  }

}
