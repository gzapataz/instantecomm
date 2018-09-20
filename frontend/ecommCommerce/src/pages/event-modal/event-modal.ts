import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { IAppointment, AppointmentClass } from "../../classes/appointment-class";
import {CustomerClass} from "../../classes/customer-class";
import {Observable} from "rxjs";
import {map, filter} from "rxjs/operators";
import {observableToBeFn} from "rxjs/testing/TestScheduler";
import {ServiceClass} from "../../classes/service-class";
import {LoggedProfessional} from "../../classes/logged-class";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage implements OnInit {

  eventColor = 'default';
  servicesAvail = [];
  servicesAvailAux$: Observable<any[]>;
  customerSelected: CustomerClass;
  eventSelected: '';
  professional: LoggedProfessional;

  event: IAppointment;
  prevEventImage: IAppointment = undefined;


  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private servicesService: ServiceServiceProvider ) {
    this.customerSelected = this.navParams.get('customerSelected');
    this.professional = this.navParams.get('professional');
    if (this.navParams.get('eventSelected')) {
      this.event = this.navParams.get('eventSelected');
      this.prevEventImage = Object.assign({}, this.event);
      this.event.startTime =moment(this.event.startTime).format();
      this.event.endTime = moment(this.event.endTime).format();
    }
    else {
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      let thsService = this.navParams.get('service');
      this.event = new AppointmentClass(null, UUID.UUID(), this.professional.idSchedule, preselectedDate, preselectedDate,null, null, this.customerSelected._id, this.customerSelected.name, this.professional.userId, thsService, null);
      this.event.startTime = preselectedDate;
      if (thsService !== undefined) {
        this.event.service = thsService;
        this.getServicesId(thsService).subscribe(data => {
          this.event.endTime = moment(this.event.startTime).add(data[0].averageTime, 'm').format();
          this.event.durationTime = data[0].averageTime;
        });
      }
    }
  }


  ngOnInit() {
    console.log('Me volvi a disparar');
    this.eventSelected = this.navParams.get('eventSelected');
    this.getServices()
  }

  getServices() {
    this.servicesService.getServices().subscribe(servicesAvail =>
    {
      this.servicesAvail = servicesAvail
    });
  }

  getServicesId(id): Observable<ServiceClass[]> {
    return this.servicesService.getServices().map(services => services.filter(result => result._id == id))
  }

  onServiceSelected() {
    this.event.endTime = moment(this.event.startTime).add(this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).averageTime, 'm').format();
    this.event.durationTime = this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).averageTime;
  }

  confirmAppnt(status) {
    this.event.status = status;
    this.viewCtrl.dismiss(this.event);
  }

  cancel() {
    if (this.navParams.get('eventSelected')) {
      this.event.service = this.prevEventImage.service;
    }
    this.viewCtrl.dismiss(this.prevEventImage);
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
