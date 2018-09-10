import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { IAppointment, AppointmentClass } from "../../classes/appointment-class";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage implements OnInit {

  eventColor = 'default';

  servicesAvail = [];

  event: IAppointment;


  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private servicesService: ServiceServiceProvider ) {
    if (this.navParams.get('eventSelected')) {
      this.event = this.navParams.get('eventSelected');
      this.event.startTime =moment(this.event.initialDate).format();
      this.event.endTime = moment(this.event.finalDate).format();
    }
    else {
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event = new AppointmentClass(UUID.UUID(), preselectedDate, preselectedDate, new Date(preselectedDate), new Date(preselectedDate), null, null, null, null, null, null);
    }
  }

  ngOnInit() {
    this.getServices()
  }

  getServices() {
    this.servicesService.getServices().subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }

  onServiceSelected() {
    this.event.endTime = moment(this.event.startTime).add(this.servicesAvail.find(serviceAvail => serviceAvail.id == this.event.serviceId).averageTime, 'm').format();
    this.event.finalDate = moment(this.event.startTime).add(this.servicesAvail.find(serviceAvail => serviceAvail.id == this.event.serviceId).averageTime, 'm').toDate();
    this.eventColor = 'default';
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    if (this.event.serviceId) {
      console.log('obteniendo dato:' + JSON.stringify(this.event));
      this.event.title = this.servicesAvail.find(serviceAvail => serviceAvail.id == this.event.serviceId).name;
      this.viewCtrl.dismiss(this.event);
    }
    else {
      this.eventColor = 'danger';
    }
  }

}
