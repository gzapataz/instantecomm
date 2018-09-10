import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { DragulaService } from "ng2-dragula";


import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import localCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from "@angular/common";
import {Timestamp} from "rxjs";
registerLocaleData(localCo);


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

  eventSelected = false;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  servicesAvail = [];

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
              private servicesService: ServiceServiceProvider) {
      dragulaService.createGroup('SERVICE', {
        copy: (el, source) => {
          console.log('A Crear 1' + el.id);


          let eventData = {
            title: el.id,
            startTime: new Date(),
            endTime: new Date(),
            eventColor: 'green'
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

  ngOnInit() {
    this.getServices()
  }

  getServices() {
    this.servicesService.getServices().subscribe(servicesAvail => this.servicesAvail = servicesAvail);
  }

  changeMode(newMode) {
    this.calendar.mode = newMode;
  }

  updateEvent(event) {
    var modal;
    modal = this.modalCtrl.create('EventModalPage', {selectedDay: event.startTime, eventSelected: event});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log('Data:' + JSON.stringify(data));
        let events = this.eventSource;
        let eventData = events.find(x => x.id == data.id) ;
        eventData.title = data.title;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay, eventSelected: null});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.eventColor= 'blue';
        let events = this.eventSource;
        events.push(eventData);
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
    this.eventSelected = true;
    this.updateEvent(event);
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    if (!this.eventSelected) {
      this.addEvent();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  loadEvents() {
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
