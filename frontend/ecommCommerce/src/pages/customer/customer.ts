import {Component, OnInit} from '@angular/core';
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { CustomerClass } from "../../classes/customer-class";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";
import {LoggedProfessional} from "../../classes/logged-class";
import { Platform } from 'ionic-angular';
import * as moment from "moment";



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
  loggedUser: LoggedProfessional;
customer:CustomerClass;
  eventSelected = false;
  eventSource = [];
  myCustomers: CustomerClass[] = [];
  loadedCountryList: CustomerClass[] = [];
  selectedDay = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService: CustomerServiceProvider,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private platform: Platform,
              private globalService: GlobalsServiceProvider) {
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.myCustomers = this.myCustomers.filter((v) => {
      if(v.person.personName.firstName && q ||v.person.personName.lastName && q) {
        if (v.person.personName.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1||v.person.personName.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.myCustomers.length);

  }
  initializeItems(): void {
    this.myCustomers = this.loadedCountryList;
  }
  getCustomers(professionaUID) {
    this.customerService.getCustomers(professionaUID).subscribe(data => this.myCustomers = data);
    this.customerService.getCustomers(professionaUID).subscribe(data => this.loadedCountryList = data);
  }

  ngOnInit() {
    //console.log('LOGGED CALENDAR:' + JSON.stringify(this.globalService.getLoggedProffessionalData()));
    let userLogged = this.globalService.getLoggedProffessionalData();
    this.loggedUser= this.globalService.getLoggedProffessionalData();
    if (userLogged.userId === '' || userLogged.userId == null) {
      return;
    };

    this.getCustomers(userLogged.userId);
  }

  refreshView() {
    this.getCustomers(this.loggedUser.userId);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    //this.refreshView();


    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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



  customerSelected(customer) {
    this.customer=customer;
    //this.navCtrl.push('CustomerDetailPage', {customer: customer});
    //console.log(`Clicked customer:` + customer)
    let modal = this.modalCtrl.create('CustomerDetailPage', {
    customer: customer,
     profesionalID:this.loggedUser.userId
    });
    modal.present();
    modal.onDidDismiss( data => {
      this.refreshView();
    })
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

        this.eventSource = [];
        this.eventSelected = false;
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CustomerPage');
  }

  startChat(mobile) {
  }
  addCustomer(){
    let userLogged = this.globalService.getLoggedProffessionalData();

    if (userLogged.userId === '' || userLogged.userId == null) {
      let alert = this.alertCtrl.create({
        title: 'Errro de Ingreso',
        subTitle: 'Debe ingresar sus credenciales antes agregar un paciente',
        buttons: ['Dismiss']
      })
      alert.present();
    }
  else {
      let modal = this.modalCtrl.create('CustomerAddModalPage', {
        professional: this.loggedUser
      });
      modal.present();
      modal.onDidDismiss(data => {

        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        console.log('PLATAFORMA ' + this.platform.platforms());
    if(data!=undefined && this.platform.is('mobile')){
      console.log('entrando a MODAL Whatsapp :' + JSON.stringify(this.loggedUser.jsonProfessional))
      let professional = this.loggedUser.jsonProfessional['person']['personName']['firstName'] + ' ' + this.loggedUser.jsonProfessional['person']['personName']['lastName'];
      console.log(professional)
      this.openmodalwhatsapp(data.mobile, data.personName, professional);
    }

    });
    }
}

openmodalwhatsapp(mobile, personName, professional){

  let modal = this.modalCtrl.create('CustomerWhatsappPage', {
    mobile: mobile,
    customer: personName,
    professional: professional
  });
  modal.present();
  modal.onDidDismiss(data => {
  this.navCtrl.setRoot(this.navCtrl.getActive().component);

  });

}
}
