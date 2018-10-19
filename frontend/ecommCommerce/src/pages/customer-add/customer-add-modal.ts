import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { ServiceServiceProvider } from "../../providers/service-service/service-service";
import { IAppointment, AppointmentClass } from "../../classes/appointment-class";
import { IPerson, Person } from "../../classes/customer-class";
import {Observable} from "rxjs";
import {map, filter} from "rxjs/operators";
import {observableToBeFn} from "rxjs/testing/TestScheduler";
import {ServiceClass} from "../../classes/service-class";
import {LoggedProfessional} from "../../classes/logged-class";

@IonicPage()
@Component({
  selector: 'page-customer-add-modal',
  templateUrl: 'customer-add-modal.html',
})
export class CustomerAddModalPage implements OnInit {

  professional: LoggedProfessional;
  event: IPerson;
  prevEventImage: IPerson = undefined;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,

              private alertCtrl: AlertController) {
    this.professional = this.navParams.get('professional');
    console.log(this.professional);
   /*
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event = new AppointmentClass(null, UUID.UUID(), this.professional.idSchedule, preselectedDate, preselectedDate,null, null, this.customerSelected._id, this.customerSelected.name, this.professional.userId, thsService, null);
  */
  }

  ngOnInit() {
    console.log('Me volvi a disparar');
  }


  cancel() {

    this.viewCtrl.dismiss(this.prevEventImage);
  }

  onGenderSelected(){
    console.log((<HTMLInputElement>document.getElementById("gender")).value)
  }
  save() {
    console.log((<HTMLInputElement>document.getElementById("gender")).value)
    /*
    *  console.log('En Add-Service:' + service);
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
    }*/



    /*this.appointmentService.addAppointment(eventData).subscribe(data => {
         console.log('Datos Salvados:' + JSON.stringify(data));
       });*/
  /*  if (this.event.service) {
      this.event.title = this.servicesAvail.find(serviceAvail => serviceAvail._id == this.event.service).name + ': ' + this.event.clientName;
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
    }*/
  }

}
