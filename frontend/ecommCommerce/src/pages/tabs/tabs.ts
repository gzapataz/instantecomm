import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CalendarPage } from "../calendar/calendar";
import { CustomerPage } from "../customer/customer";
import {AlertController, NavController, Platform, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {



  tab1Root = HomePage;
  tab2Root = CalendarPage;
  tab3Root = CustomerPage;
  myIndex: number;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private platform: Platform, navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }



}
