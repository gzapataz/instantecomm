import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { DragulaService } from "ng2-dragula";
import { Platform } from 'ionic-angular'


import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { ScheduleServiceProvider } from "../../providers/schedule-service/schedule-service";
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import { CustomerClass } from "../../classes/customer-class";
import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
import { PreferencesServiceProvider } from "../../providers/preferences-service/preferences-service";

registerLocaleData(localCo);

import { CustomerSearchComponent } from "../../components/customer-search/customer-search";
import {Observable} from "rxjs";
import {AppointmentServiceProvider} from "../../providers/appointment-service/appointment-service";


/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Product {
  description: string
  duration: number;
}


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [ScheduleServiceProvider]
})
export class CalendarPage implements OnInit {

  eventCollection = [];
  eventSelected = false;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  servicesAvail = [];
  customers: CustomerClass[];
  customerId: CustomerClass;
  customerAppnt:  CustomerClass;
  customer$: Observable<CustomerClass>;

  calendar = {
    mode: 'day',
    locale: localCo[0],
    currentDate: new Date(),
      onTimePress(event) {
        if (this.isEventSelected) {
          return;
        }
        console.log('Aqui vamos en evento')
      },

    onClick() {
      console.log('Aqui vamos en evento Click')

    },
    onMove(event) {
      //console.log('MVX ' +  event.movementX + ' ' + event.movementY)
      //console.log('Region ' +  event.region)
    },
    onMoveDown(event) {
      //console.log('Down Fired' +  event.movementX + ' ' + event.movementY)

    },
    onDrop(){
      console.log('Estamos en Drop')
    },
    onDoubleClick(){
      console.log('Doble Click')
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private modalCtrl: ModalController, private dragulaService: DragulaService,
              private servicesService: ServiceServiceProvider,
              private customerService: CustomerServiceProvider,
              private appointmentService: AppointmentServiceProvider,
              private scheduleServiceProvider: ScheduleServiceProvider,
              private platform: Platform,
              public preferencesProvider: PreferencesServiceProvider) {

      dragulaService.createGroup('SERVICE', {
        copy: (el, source) => {
          console.log('A Crear 1' + JSON.stringify(el.id) + ' Source ' + JSON.stringify(source));
          this.addEvent(el.id);
          /*
          let eventData = {
            title: el.id,
            startTime: new Date(),
            endTime: new Date(),
            eventColor: 'red'
          };

          let events = this.eventSource;
          events.push(eventData);
          console.log('Source' + events);
          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          });
          */
          return source.id === 'left';
        },
        copyItem: (servAval: String) => {
          console.log('A Crear 2');
          return servAval;
        },
        accepts: (el, target, source, sibling) => {
          // To avoid dragging from right to left container
          console.log('A Crear 3');
          return target.id !== 'left';
        }
    });
  }



  receiveMessage($event) {
    console.log('Mensaje Recibido:' + $event);
    this.customerId = $event
  }

  ngOnInit() {
    console.log('Plataforma:' + this.platform.platforms());
    this.loadEvents();
    this.getServices();
    this.getCustomers();

  }

  getServices() {
    this.servicesService.getServices().subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      console.log('Customers' + JSON.stringify(this.customers));
      console.log('CustomersName:' + customers[0].person.personName.firstName);
    });
  }

  getCustomer(id: string) {
    console.log('Buscando cliente:' + id);
    this.customerService.getCustomer(id).subscribe(customer => {
        return customer;
    });
  }

  changeMode(newMode) {
    this.calendar.mode = newMode;
  }

  updateEvent(event) {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: event.startTime, eventSelected: event, customerSelected: event.customerId});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let events = this.eventSource;
        let eventData = events.find(x => x._id == data._id) ;
        eventData.title = data.title;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData = this.preferencesProvider.getColor(eventData);
        this.eventSelected = false;
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }


  addEvent(service: string = undefined) {
    console.log('En Add-Service:' + service);
    if (this.customerId) {
      let modal = this.modalCtrl.create('EventModalPage', {
        selectedDay: this.selectedDay,
        eventSelected: null,
        customerSelected: this.customerId,
        service: service
      });
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          let eventData = data;
          eventData.startTime = new Date(data.startTime);
          eventData.endTime = new Date(data.endTime);
          eventData.status = 'Agendada';
          eventData = this.preferencesProvider.getColor(eventData);
          let events = this.eventSource;
          events.push(eventData);
          this.eventCollection.push(eventData);
          this.appointmentService.addAppointment(eventData).subscribe(data => {
            eventData._id = data._id;
             console.log('Datos Salvados:' + JSON.stringify(eventData ));

          });
          this.eventSource = [];
          this.eventSelected = false;
          setTimeout(() => {
            this.eventSource = events;
          });
        }
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Busqueda de Paciente',
        subTitle: 'Debe seleccionar un paciente en Buscar',
        buttons: ['Dismiss']
      })
      alert.present();
    }
  }


  today() {
    this.calendar.currentDate = new Date();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event onEventSelected ' + JSON.stringify(event))
    this.eventSelected = true;
    this.updateEvent(event);
  }

  onTimeSelected(ev) {
    console.log('Event onTimeSelected' + ev + ' ' + this.eventSelected);
    this.selectedDay = ev.selectedTime;
    if (!this.eventSelected && this.calendar.mode == 'day' ) {
      if (this.customerId) {
        this.addEvent();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Busqueda de Paciente',
          subTitle: 'Debe seleccionar un paciente en Buscar',
          buttons: ['Dismiss']
        })
        alert.present();
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  loadEvents() {
/*
    this.eventSource = [{"_id":"5b988ef96db10564e1aba5f7","startTime":"2018-09-19T20:00:00.000Z",
      "endTime":"2018-09-19T21:00:00.000Z","durationTime":60,"status":"Agendada","title":"Cita Nueva",
      "client":{"_id":"5b986a57843030601ca3db1a","clientSince":"2018-09-12T01:22:31.694Z","lastVisit":"2018-09-12T01:22:31.694Z",
        "status":"A","person":{"personName":{"firstName":"Valentina","lastName":"Mahecha"},"_id":"5b986a56843030601ca3db19",
          "creationDate":"2018-09-12T01:22:30.852Z","idType":"RC","gender":"F","birthdate":"2017-10-04T00:00:00.000Z","phone":"7782415",
          "mobile":"573123033470","email":"valen@valen.com","identification":"10900002341","__v":0},"__v":0},
      "professional":{"_id":"5b986c2e6775906044a08d5e","professionalSince":"2018-09-12T01:30:22.501Z",
        "lastVisit":"2018-09-12T01:30:22.501Z","status":"A",
        "person":{"personName":{"firstName":"Pedro","lastName":"Picapiedra"},"_id":"5b986c2e6775906044a08d5d",
          "creationDate":"2018-09-12T01:30:22.171Z","idType":"CC","gender":"M","birthdate":"1960-08-08T00:00:00.000Z",
          "phone":"573223513582","mobile":"573223513582","email":"p.picapiedra@uniandes.edu.co","identification":"562312","__v":0},
        "professionalSchedule":"5b9b35508365b87a63f45aee","uid":"qLDKHOrxq4d3zKimy9bGQ6YO4q83","__v":0},
      "service":{"_id":"5b95e37e5837d923570f4ed9","name":"Periodoncia","description":"Es el área que trata todo tipo de afecciones en los casos que involucran los tejidos del periodonto del diente, tales como encía, hueso y ligamento periodontal",
        "averageTime":60,"__v":0},"__v":0},
    ]
    this.eventSource[0].startTime = new Date(this.eventSource[0].startTime);
    this.eventSource[0].endTime = new Date(this.eventSource[0].endTime);
    this.eventSource[0].eventColor = 'green';
    console.log('DatosAgenda:' + JSON.stringify(this.eventSource));
    */

    this.scheduleServiceProvider.getSchedule('5b9b35508365b87a63f45aee').subscribe( data => {
      console.log("datos de Agenda Queyr:" + JSON.stringify(data))
      this.eventSource = data; //['appointments'];
      console.log('DatosAgenda:' + JSON.stringify(this.eventSource));
    });
    //Cargar eventos
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(2, 0, 0);
    return date < current;
  };
}
