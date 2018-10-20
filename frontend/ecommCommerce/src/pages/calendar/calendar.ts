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
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";
import {AppointmentClass} from "../../classes/appointment-class";


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
  loggedUser: LoggedProfessional;
  customerAppnt:  CustomerClass;
  customer$: Observable<CustomerClass>;
  theColor = 'white'

  calendar = {
    mode: 'week',
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
              public preferencesProvider: PreferencesServiceProvider,
              private globalService: GlobalsServiceProvider) {

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

  onSelect() {
    console.log('DISP');
    this.theColor = 'black';
  }

  receiveMessage($event) {
    console.log('Mensaje Recibido:' + $event);
    this.customerId = $event
  }

  ngOnInit() {

    console.log('Plataforma:' + this.platform.platforms());
    console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
      return;
    };

    this.loadEvents();
    this.getServices();
    this.getCustomers();

  }

  ionViewWillEnter() {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
      let alert = this.alertCtrl.create({
        title: 'Errro de Ingreso',
        subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
        buttons: ['Dismiss']
      })
      alert.present();
      this.navCtrl.push('LoginPage');
    } else if (this.servicesAvail.length == 0) {
        this.getServices();
      this.getCustomers();
    }
    this.loadEvents();

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
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: event.startTime, eventSelected: event, customerSelected: event.customerId, professional: this.loggedUser});
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
    console.log('En SelectedDate:' + this.selectedDay + ' ' + this.selectedDay.getFullYear() + this.selectedDay.getMonth() + this.selectedDay.getDate() );
    let fromDateMls = new Date(this.selectedDay.toDateString()).getTime();
    let toDateMls = fromDateMls;
    fromDateMls -= 24 * 60 * 60 * 1000;
    toDateMls += 24 * 60 * 60 * 1000;
    let fromDate = new Date(fromDateMls);
    let toDate = new Date(toDateMls);

    let dayEvents = this.filterEvents(fromDate, toDate);
    if (this.customerId) {
      let modal = this.modalCtrl.create('EventModalPage', {
        selectedDay: this.selectedDay,
        eventSelected: null,
        customerSelected: this.customerId,
        service: service,
        professional: this.loggedUser,
        events: dayEvents
      });
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          let eventData = data;
          eventData.startTime = new Date(data.startTime);
          eventData.endTime = new Date(data.endTime);
          eventData.status = 'Agendada';
          eventData = this.preferencesProvider.getColor(eventData);
          eventData.professional = this.loggedUser.userId;
          let events = this.eventSource;
          events.push(eventData);
          this.eventCollection.push(eventData);
          this.appointmentService.addAppointment(eventData).subscribe(data => {
            eventData._id = data._id;
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
    else {
      let alert = this.alertCtrl.create({
        title: 'Busqueda de Paciente',
        subTitle: 'Debe seleccionar un paciente en Buscar',
        buttons: ['Dismiss']
      })
      alert.present();
    }
  }

  validateSlotTime(currentEvent): boolean {

    let auxEvent = this.eventSource.filter( eventDate => {
      return currentEvent.startTime >= eventDate.startTime && currentEvent.endTime >= eventDate.endTime && currentEvent.startTime <= eventDate.endTime
    });

    if (auxEvent.length > 0 ) {
      return false
    }
    return true;

  }

  filterEvents(fromDate, toDate): AppointmentClass[] {

    return this.eventSource.filter( eventDate => {
      return fromDate <= eventDate.startTime && eventDate.endTime <= toDate
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
    this.theColor = 'blue';
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
    this.scheduleServiceProvider.getSchedule(this.loggedUser.idSchedule).subscribe( data => {
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
