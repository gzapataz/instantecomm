import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ScheduleServiceProvider } from "../../providers/schedule-service/schedule-service";
import * as moment from 'moment';

import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localCo);

import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";




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
  };

  constructor(private scheduleServiceProvider: ScheduleServiceProvider,
              private globalService: GlobalsServiceProvider) {


  }

  ngOnInit() {
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

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  loadEvents() {
    let fromDate = moment(new Date().setHours(0,0,0,0)).format();
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+1);

    let toDate = moment(tomorrow.setHours(0,5,0,0)).format();
    //console.log('DatosAgenda tiempo2:' + fromDate+" end "+toDate);
    this.scheduleServiceProvider.getSchedule(this.loggedUser.userId, fromDate, toDate).subscribe( data => {
      //console.log("datos de Agenda Quey2:" + JSON.stringify(data))
      this.eventSource = data; //['appointments'];
      //console.log('DatosAgenda2:' + JSON.stringify(this.eventSource));
    });
    //Cargar eventos
  }

  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(2, 0, 0);
    return date < current;
  };
}
