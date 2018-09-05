import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  appointmentsInfo = [
    {serviceName: 'Blanqueamiento', professional: 'Sandra Robayo', appntDate: '12-12-2019: 9:00 AM', recommendations:'No comer'},
    {serviceName: 'Ortodoncia', professional: 'Sandra Robayo', appntDate: '13-12-2019: 9:00 AM', recommendations:'Ninguna'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
  }

}
