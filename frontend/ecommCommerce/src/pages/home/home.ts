import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular'
//import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { ScheduleServiceProvider } from "../../providers/schedule-service/schedule-service";
import * as moment from 'moment';

import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
import { PreferencesServiceProvider } from "../../providers/preferences-service/preferences-service";

registerLocaleData(localCo);



import {AppointmentServiceProvider} from "../../providers/appointment-service/appointment-service";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";
import {ScreenOrientation} from "@ionic-native/screen-orientation";




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ScheduleServiceProvider]
})
export class HomePage implements OnInit {

  loggedUser: LoggedProfessional;
  eventSelected = false;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  theColor = 'white'

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
    //onDrop(){
      //console.log('Estamos en Drop')
    //},
    onDoubleClick(){
      console.log('Doble Click')
    }
  };

  constructor(public navParams: NavParams, private alertCtrl: AlertController,
              private modalCtrl: ModalController,
private appointmentService: AppointmentServiceProvider,
              private scheduleServiceProvider: ScheduleServiceProvider,
              private globalService: GlobalsServiceProvider,
              private platform: Platform,
              public screenOrientation: ScreenOrientation) {

  }

  onSelect() {
    console.log('DISP');
    this.theColor = 'black';
  }



  ngOnInit() {

    console.log('LOGGED CALENDAR1:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
    let userLogged = this.globalService.getLoggedProffessionalData();

    if (userLogged.userId === '' || userLogged.userId == null) {
      console.log("datos de Agenda Quey11 return 1:" )

      return;
    };
    this.initdata();


  }

   initdata(){
     this.loggedUser= this.globalService.getLoggedProffessionalData();
      this.loadEvents();
  }
  ionViewWillEnter() {
  let userLogged = this.globalService.getLoggedProffessionalData();

  if (userLogged.userId === '' || userLogged.userId == null) {
      console.log("datos de Agenda Quey11 return 2:" )

      return;
    };
    console.log("datos de Agenda Quey22 user:" + userLogged.userId)
    this.initdata();

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


  today() {
    this.calendar.currentDate = new Date();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event onEventSelected ' + JSON.stringify(event))
    this.eventSelected = true;
  //  this.updateEvent(event);
  }

  onTimeSelected(ev) {
    this.theColor = 'blue';
    console.log('Event onTimeSelected' + ev + ' ' + this.eventSelected);
    this.selectedDay = ev.selectedTime;
    if (!this.eventSelected && this.calendar.mode == 'day' ) {

    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');


  }

  loadEvents() {
    let fromDate = moment(new Date().setHours(0,0,0,0)).format();
    let toDate = moment(new Date().setHours(11,59,59,59)).format();

    this.scheduleServiceProvider.getSchedule(this.loggedUser.userId, fromDate, toDate).subscribe( data => {
      //console.log("datos de Agenda Quey2:" + JSON.stringify(data))
      this.eventSource = data; //['appointments'];
      console.log('DatosAgenda2:' + JSON.stringify(this.eventSource));
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
