import {Component, OnDestroy, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { DragulaService } from "ng2-dragula";
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { ScheduleServiceProvider } from "../../providers/schedule-service/schedule-service";
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import { CustomerClass } from "../../classes/customer-class";
import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
import { PreferencesServiceProvider } from "../../providers/preferences-service/preferences-service";

registerLocaleData(localCo);

import {AppointmentServiceProvider} from "../../providers/appointment-service/appointment-service";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";
import {AppointmentClass} from "../../classes/appointment-class";
import { ExceptionServiceProvider } from "../../providers/exception-service/exception-service";
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";



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
export class CalendarPage implements OnInit, OnDestroy {

  eventCollection = [];
  eventSelected = false;
  eventSource = [];
  eventExceptions = [];
  viewTitle: string;
  selectedDay = new Date();
  servicesAvail = [];
  customers: CustomerClass[];
  customerId: CustomerClass;
  loggedUser: LoggedProfessional;
  theColor = 'white';
  fromDate = null;
  toDate = null;
  startHour = "6";
  endHour = '22';
  space = '1';

  calendar = {
    mode: 'day',
    formatHourColumn: 'h:mm',
    queryMode: 'remote',

    locale: localCo[0],
    currentDate: new Date(),
    onTimePress(event) {
      if (this.isEventSelected) {
        return;
      }
      //console.log('Aqui vamos en evento')
    },

    onClick() {
      //console.log('Aqui vamos en evento Click')

    },
    onMove(event) {
      ////console.log('MVX ' +  event.movementX + ' ' + event.movementY)
      ////console.log('Region ' +  event.region)
    },
    onMoveDown(event) {
      ////console.log('Down Fired' +  event.movementX + ' ' + event.movementY)

    },
    onRangeChanged(ev) {
      //console.log('RangeEstamos en Drop:' + ev)
    },
    onDrop(){
      //console.log('Estamos en Drop')
    },
    onDoubleClick(){
      //console.log('Doble Click')
    }
  };

  markDisabled = (date:Date) => {
    var val = true;
    var current = new Date();
    //return this.findException(date);
    return date < current;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private modalCtrl: ModalController, private dragulaService: DragulaService,
              private authService: AuthenticationServiceProvider,
              private servicesService: ServiceServiceProvider,
              private customerService: CustomerServiceProvider,
              private appointmentService: AppointmentServiceProvider,
              private scheduleServiceProvider: ScheduleServiceProvider,
              private platform: Platform,
              public preferencesProvider: PreferencesServiceProvider,
              private globalService: GlobalsServiceProvider,
              public screenOrientation: ScreenOrientation,
              private exceptionServiceProvider: ExceptionServiceProvider) {
    try {
      this.dragulaService.destroy('SERVICE');
      this.dragulaService.createGroup('SERVICE', {
        copy: (el, source) => {
          this.addEvent(el.id);

          return source.id === 'left';
        },
        copyItem: (servAval: String) => {
          //console.log('A Crear 2');
          return servAval;
        },
        accepts: (el, target, source, sibling) => {
          // To avoid dragging from right to left container
          //console.log('A Crear 3');
          return target.id !== 'left';
        }
      });
    }
    catch(e) {
      console.log('DRAGULA ERROR:'+ e.toString());
    }
  }

  onSelect() {
    //console.log('DISP');
    this.theColor = 'black';
  }

  receiveMessage($event) {
    //console.log('Mensaje Recibido:' + $event);
    this.customerId = $event
  }
/*
  ionViewCanEnter() {
    console.log('Validando Permisos');
    if (!this.authService.isAuthenticated()) {
      let alert = this.alertCtrl.create({
        title: 'Errro de Ingreso',
        subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
        buttons: ['Dismiss']
      })
      alert.present();
      this.navCtrl.pop();
      //this.navCtrl.push('LoginPage');
      return false;
    }
    return true;
  }
*/
  ngOnInit() {

    console.log('Plataforma:' + this.platform.platforms());
    //console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
    this.loggedUser = this.globalService.getLoggedProffessionalData();

    if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
      console.log('SALIENDO:' + JSON.stringify(this.loggedUser))
      this.navCtrl.push('LoginPage');
      return;
    } else {
      this.startHour = this.loggedUser.startHour;
      this.endHour = this.loggedUser.endHour;

      this.getServices(this.loggedUser.userId);
      this.getCustomers(this.loggedUser.userId);
    }

    console.log('ENTRANDO CALENDAR:')
    this.getServices(this.loggedUser.userId);
    this.getCustomers(this.loggedUser.userId);
  }

  ngOnDestroy() {
    //console.log('DESTROYENDO');
  }

  findException(date): boolean {
    var fest = this.eventExceptions.filter ( exceptionList => {
      console.log ('COMPARANDO:' + moment(exceptionList.startTime).format("YYYYMMDD") + ' AND ' + moment(date).format("YYYYMMDD"));
      return moment(exceptionList.startTime).format("YYYYMMDD") === moment(date).format("YYYYMMDD")
    })
    //console.log('fest:' + JSON.stringify(fest));
    if (fest.length > 0)
      return true;
    return false;
  }

  ionViewWillEnter() {
    /*
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
        this.getServices(this.loggedUser.userId);
      this.getCustomers(this.loggedUser.userId);
    }
    //this.loadEvents(this.loggedUser.userId);
  */
  }

  getServices(professionalUID) {
    this.servicesService.getServices(professionalUID).subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }

  getCustomers(professionalUID) {
    this.customerService.getCustomers(professionalUID).subscribe(customers => {
      this.customers = customers;
      //console.log('Customers' + JSON.stringify(this.customers));
      //console.log('CustomersName:' + customers[0].person.personName.firstName);
    });
  }

  getCustomer(id: string){
    var theCustomer;
    //console.log('Buscando cliente:' + id);
    this.customerService.getCustomer(id).subscribe(customer => theCustomer = customer);
    return theCustomer;

  }
  goToActual() {
    this.calendar.currentDate = new Date();
  }

  changeMode(newMode) {
    this.calendar.mode = newMode;
  }

  updateEvent(event) {
    var appntCustomer = this.getCustomer(event.client);
    //console.log('Entrando a Cita Update:' + JSON.stringify(appntCustomer));
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: event.startTime, eventSelected: event, customerSelected: appntCustomer, professional: this.loggedUser, events: this.eventSource });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let events = this.eventSource;
        let eventData = events.find(x => x._id == data._id) ;
        if (data.status !== 'Cancelada' ) {
          eventData.title = data.title;
          eventData.startTime = new Date(data.startTime);
          eventData.endTime = new Date(data.endTime);
          eventData = this.preferencesProvider.getColor(eventData);
        }
        else {
          const index: number = events.indexOf(eventData);
          if (index !== -1) {
            events.splice(index, 1);
          }
        }
        this.appointmentService.updateAppointment(eventData).subscribe(data => {
          eventData._id = data._id;
          //console.log('Datos Salvados:' + JSON.stringify(data));

        });
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
      console.log('YESTOSALIO:' + JSON.stringify(event))
      this.eventSelected = false;
    });
  }


  addEvent(service: string = undefined) {
    //console.log('En Add-Service:' + service);
    //console.log('En SelectedDate:' + this.selectedDay + ' ' + this.selectedDay.getFullYear() + this.selectedDay.getMonth() + this.selectedDay.getDate() );
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
          console.log('VOYA SALVAR'+ JSON.stringify(data));
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
            //console.log('Datos Salvados:' + JSON.stringify(data));

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
    //console.log('Event onEventSelected ' + JSON.stringify(event))
    if (event.status !== 'Excepción') {
      this.eventSelected = true;
      console.log('AMODIF=' + JSON.stringify(event))
      this.updateEvent(event);
    }
  }

  onTimeSelected(ev) {
    this.theColor = 'blue';
    //console.log('Event onTimeSelected' + ev + ' ' + this.eventSelected);
    this.selectedDay = ev.selectedTime;
    if (!this.eventSelected && (this.calendar.mode == 'day' || this.calendar.mode == 'week') ) {
      if (!this.findException(this.selectedDay)) {
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
      } else {
        let alert = this.alertCtrl.create({
          title: 'Excepción',
          subTitle: 'El dia es festivo o de excepción, desea agendar de todos modos?',
          buttons: [{text: 'NO'},
            { text: 'SI',
              handler: () => {
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
            }]
        })
        alert.present();
      }
    }
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad CalendarPage');
  }

  refreshView() {
    this.loadEvents(this.loggedUser.userId, moment(this.fromDate).format(), moment(this.toDate).format());
    this.loadExceptions(this.loggedUser.userId, moment(this.fromDate).format(), moment(this.toDate).format());
  }


  doRefresh(event) {
    console.log('Begin async operation');
    //this.refreshView();
    event.target.cancel();

    /*setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000); */
  }

  loadEvents(professionalUID, startTime, endTime) {

    this.scheduleServiceProvider.getSchedule(professionalUID, startTime, endTime).subscribe( data => {
      //console.log("datos de Agenda Queyr:" + JSON.stringify(data))
      this.eventSource = data; //['appointments'];
      this.eventSource = this.eventSource.filter(data => data.status !== 'Cancelada');
      //console.log('DatosAgenda:' + JSON.stringify(this.eventSource));
    });
    //console.log('DatosAgenda:' + JSON.stringify(this.eventSource));
    //Cargar eventos
  }

  loadExceptions(professionalUID, startTime, endTime) {
    this.exceptionServiceProvider.getException(professionalUID, startTime, endTime).subscribe( data => {
      ////console.log("datos de Agenda Queyr:" + JSON.stringify(data))
      //console.log('DATAExcepciones:' + JSON.stringify(data));
      if (data)
        this.eventExceptions = data; //['appointments'];
      else
        this.eventExceptions = [];
      //console.log('Excepciones:' + JSON.stringify(this.eventExceptions))
    });
    //Cargar eventos
  }



  onRangeChanged(ev) {
    //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    //console.log('Leer eventos del servidor');
    this.fromDate = ev.startTime;
    this.toDate = ev.endTime;
    this.loadEvents(this.loggedUser.userId, moment(ev.startTime).format(), moment(ev.endTime).format());
    this.loadExceptions(this.loggedUser.userId, moment(ev.startTime).format(), moment(ev.endTime).format());
  }


}
