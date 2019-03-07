import {Component, NgModule, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import * as moment from 'moment';
import { PipesModule } from "../../pipes/pipes.module";
import { UUID } from 'angular2-uuid';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { IAppointment, AppointmentClass } from "../../classes/appointment-class";
import {CustomerClass} from "../../classes/customer-class";
import {Observable} from "rxjs";
import {ServiceClass} from "../../classes/service-class";
import {LoggedProfessional} from "../../classes/logged-class";
import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
import {DomSanitizer} from '@angular/platform-browser';
import { Platform } from 'ionic-angular';

import {SafeUrlPipe} from "../../pipes/safe-url/safe-url";

registerLocaleData(localCo);


@IonicPage()

@NgModule({
  imports:[PipesModule]
})

@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage implements OnInit {
  messageTest = '';
  eventColor = 'default';
  servicesAvail = [];
  servicesAvailAux$: Observable<any[]>;
  customerSelected: CustomerClass;
  eventSelected: '';
  smsmobile: any;
  professional: LoggedProfessional;
  events: AppointmentClass[] = [];

  event: IAppointment;
  prevEventImage: IAppointment = undefined;


  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private servicesService: ServiceServiceProvider,
              private alertCtrl: AlertController,
              private platform: Platform,
              private sanitizer:DomSanitizer) {
      this.customerSelected = this.navParams.get('customerSelected');
      console.log(`this.customerSelected ` + JSON.stringify(this.customerSelected));
      this.professional = this.navParams.get('professional');
      this.events = this.navParams.get('events');
      console.log('Tosos los events:'+ JSON.stringify(this.events))
      this.smsmobile = "sms:573112112385"; //sanitizer.bypassSecurityTrustResourceUrl("sms:573112112385");

      if (this.navParams.get('eventSelected')) {
        this.event = this.navParams.get('eventSelected');
        this.prevEventImage = Object.assign({}, this.event);
        this.event.startTime =moment(this.event.startTime).format();
        this.event.endTime = moment(this.event.endTime).format();
      }
      else {
        let preselectedDate = moment(this.navParams.get('selectedDay')).format();
        let thsService = this.navParams.get('service');
        this.event = new AppointmentClass(null, UUID.UUID(), this.professional.idSchedule, preselectedDate, preselectedDate,0, 'Agendada', this.customerSelected._id, this.customerSelected.name, this.professional.userId, thsService, null);
        this.event.startTime = preselectedDate;
        if (thsService !== undefined) {
          this.event.service = thsService;
          this.getServicesId(thsService).subscribe(data => {
            this.event.endTime = moment(this.event.startTime).add(data[0].averageTime, 'm').format();
            this.event.durationTime = data[0].averageTime;
          });
        }
      }
      this.messageTest = 'Buenas tardes ' + this.customerSelected.person.personName.firstName + ' su cita de ' +
        //this.event.title.slice(0, this.event.title.indexOf(':'))
        this.event.title
        + ' para el dia ' + moment(this.event.startTime).locale(localCo.toLocaleString()).format('LLLL') +
        ' Por favor para confirmar presione el siguiente link:\n' +
        'https://ecommercealinstante.herokuapp.com/appointments/confirm/' + this.event._id + '?status=Confirmada'

      console.log('MESSAGE : ' + this.messageTest);

  }

  validateSlotTime(currentEvent): boolean {
    console.log('EventsFilter:' + JSON.stringify(this.events));
    console.log('Evento:' + JSON.stringify(currentEvent));
    let auxEvent = this.events.filter( eventDate => {
      return moment(currentEvent.startTime).toDate() >= eventDate.startTime && moment(currentEvent.endTime).toDate() >= eventDate.endTime && moment(currentEvent.startTime).toDate() < eventDate.endTime
    });
    console.log('auxEvent:' + JSON.stringify(auxEvent));
    if (auxEvent.length > 0 ) {
      return false
    }
    return true;

  }

  ngOnInit() {
    console.log('Me volvi a disparar');
    this.eventSelected = this.navParams.get('eventSelected');
    if (this.eventSelected)
      this.event = this.eventSelected;
    this.getServices()
  }

  sanitaize(url) {
    let conector = '?body=';

    if (this.platform.is('ios')) {
      conector = '&body=';
    }


    this.smsmobile = 'sms:' + this.customerSelected.person.mobile + conector + this.messageTest;
    console.log('this.smsmobile:' + this.smsmobile)
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.smsmobile);
  }

  getServices() {
    this.servicesService.getServices(this.professional.userId).subscribe(servicesAvail =>
    {
      this.servicesAvail = servicesAvail
    });
  }

  getServicesId(id): Observable<ServiceClass[]> {
    return this.servicesService.getServices(this.professional.userId).map(services => services.filter(result => result._id == id))
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
    console.log('Cancelando');
    if (this.navParams.get('eventSelected')) {
      this.event.service = this.prevEventImage.service;
      this.event.startTime = moment(this.prevEventImage.startTime).format();
      this.event.endTime = moment(this.prevEventImage.endTime).format();
    }

    this.viewCtrl.dismiss(null);
  }

  newStartDate() {
    console.log(`Cambio la fecha de Inicio ${this.event.startTime}` );
    this.event.endTime = moment(this.event.startTime).add(this.event.durationTime, 'm').format();
  }

  save() {
    if (this.event.service) {
      this.event.title = this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).name + ': ' + this.customerSelected.person.personName.lastName + ' ' + this.customerSelected.person.personName.firstName;
      if (this.validateSlotTime(this.event)) {
        this.viewCtrl.dismiss(this.event);
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Espacio Ocupado',
          subTitle: 'El espacio seleccionado ya tiene una cita agendada: Presione Agendar para permitir la doble agenda o Deshacer para no ingresar la cita',
          buttons: [{text: 'Deshacer'},
            { text: 'Agendar',
              handler: () => {
                this.viewCtrl.dismiss(this.event);
              }
            }]
        })
        alert.present();
      }
    }
    else {
      this.eventColor = 'danger';
    }
  }

}
