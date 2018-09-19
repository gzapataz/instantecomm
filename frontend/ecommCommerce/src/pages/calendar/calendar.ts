import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { DragulaService } from "ng2-dragula";
import { Platform } from 'ionic-angular'


import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import { CustomerClass } from "../../classes/customer-class";
import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
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
              private platform: Platform) {

      dragulaService.createGroup('SERVICE', {
        copy: (el, source) => {
          console.log('A Crear 1' + el.id);


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
      this.customerAppnt = undefined;
      if (data) {
        let events = this.eventSource;
        let eventData = events.find(x => x.id == data.id) ;
        eventData.title = data.title;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        if (event.status == 'Confirmada') {
          eventData.eventColor =  '#3bdb01';
        }
        else {
          eventData.eventColor= '#db5614';
        }
        this.eventSelected = false;
        this.eventSource = [];

        setTimeout(() => {

          this.eventSource = events;
        });
      }
    });
  }


  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay, eventSelected: null, customerSelected: this.customerId});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.eventColor= '#db5614';
        eventData.status = 'Agendada';
        let events = this.eventSource;
        events.push(eventData);
        this.eventCollection.push(eventData);
        console.log('EVENTOS:' + JSON.stringify(this.eventCollection))
        this.appointmentService.addAppointment(eventData).subscribe(data => {
          console.log('Datos Salvados:' + JSON.stringify(data));
        });
        this.eventSource = [];
        this.eventSelected = false;
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
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
    if (!this.eventSelected) {
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
    this.appointmentService.getAppointment().subscribe( data => {
      console.log('Datos:' + JSON.stringify(data));
    });
    //Cargar eventos
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
