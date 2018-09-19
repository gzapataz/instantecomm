import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { IAppointment, AppointmentClass } from "../../classes/appointment-class";
import {CustomerClass} from "../../classes/customer-class";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage implements OnInit {

  eventColor = 'default';
  servicesAvail = [];
  customerSelected: CustomerClass;
  eventSelected: '';
  professional = {
    "_id": "5b986c2e6775906044a08d5e",
    "idSchedule": "5b9b35508365b87a63f45aee"
  }

  event: IAppointment;


  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private servicesService: ServiceServiceProvider ) {
    this.customerSelected = this.navParams.get('customerSelected');
    if (this.navParams.get('eventSelected')) {
      this.event = this.navParams.get('eventSelected');
      this.event.startTime =moment(this.event.startTime).format();
      this.event.endTime = moment(this.event.startTime).format();
    }
    else {
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event = new AppointmentClass(UUID.UUID(), this.professional.idSchedule, preselectedDate, preselectedDate,null, null, this.customerSelected._id, this.customerSelected.name, this.professional._id, null, null);
    }
  }


  ngOnInit() {
    this.eventSelected = this.navParams.get('eventSelected');
    this.getServices()
  }

  getServices() {
    this.servicesService.getServices().subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }

  onServiceSelected() {
    //this.event.endTime = moment(this.event.startTime).add(this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.serviceId).averageTime, 'm').format();
    //this.event.finalDate = moment(this.event.startTime).add(this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.serviceId).averageTime, 'm').toDate();
    this.event.durationTime = this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).averageTime;
  }

  confirmAppnt(status) {
    this.event.status = status;
    this.viewCtrl.dismiss(this.event);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    if (this.event.service) {
      console.log('obteniendo dato:' + JSON.stringify(this.event));
      this.event.title = this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).name + ': ' + this.event.clientName;
      this.viewCtrl.dismiss(this.event);
    }
    else {
      this.eventColor = 'danger';
    }
  }

}
