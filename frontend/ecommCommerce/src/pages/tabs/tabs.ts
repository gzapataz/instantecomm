import { AlertController, NavController, Platform, NavParams } from "ionic-angular";
import { Component } from '@angular/core';
import { CalendarPage } from "../calendar/calendar";
import { CustomerPage } from "../customer/customer";
import { ServicesPage } from "../services/services";
import { ReferalPage } from "../referal/referal";
import { PaymentsPage } from "../payments/payments";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = CalendarPage;
  tab2Root = CustomerPage;
  tab3Root = ServicesPage;
  tab4Root = ReferalPage;
  tab5Root = PaymentsPage;

  myIndex: number;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private platform: Platform, navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }

}
