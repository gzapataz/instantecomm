import {Component, OnInit} from '@angular/core';
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { CustomerClass } from "../../classes/customer-class";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";


/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage implements OnInit {


  eventSelected = false;
  eventSource = [];
  myCustomers: CustomerClass[] = [];
  selectedDay = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService: CustomerServiceProvider,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private globalService: GlobalsServiceProvider) {
  }

  getCustomers(professionaUID) {
    this.customerService.getCustomers(professionaUID).subscribe(data => this.myCustomers = data);
  }

  ngOnInit() {
    console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
    let userLogged = this.globalService.getLoggedProffessionalData();
    if (userLogged.userId === '' || userLogged.userId == null) {
      return;
    };

    this.getCustomers(userLogged.userId);
  }

  ionViewWillEnter () {
    let userLogged = this.globalService.getLoggedProffessionalData();
    if (userLogged.userId === '' || userLogged.userId == null) {
      let alert = this.alertCtrl.create({
        title: 'Errro de Ingreso',
        subTitle: 'Debe ingresar sus credenciales antes de poder ver la agenda',
        buttons: ['Dismiss']
      })
      alert.present();
      this.navCtrl.push('LoginPage');
    } else if (this.myCustomers.length == 0) {
      this.getCustomers(userLogged.userId);
    }
  }

  addNewAppointment(customer) {
    console.log(`Clicked customer:` + JSON.stringify(customer));
    this.addEvent(customer);

  }

  customerSelected(customer) {
    this.navCtrl.push('CustomerDetailPage', {customer: customer});
    console.log(`Clicked customer:` + customer)
  }

  addEvent(customer) {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay, eventSelected: null, customerSelected: customer});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.eventColor= 'blue';
        eventData.status = 'Agendada';
        let events = this.eventSource;
        events.push(eventData);
        /*this.appointmentService.addAppointment(eventData).subscribe(data => {
          console.log('Datos Salvados:' + JSON.stringify(data));
        });*/
        this.eventSource = [];
        this.eventSelected = false;
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  startChat(mobile) {
  }

}
