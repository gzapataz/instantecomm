import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { mobiscroll, MbscCalendarOptions } from '@mobiscroll/angular';

/*
mobiscroll.settings = {
  theme: 'ios'
};
*/

/**
 * Generated class for the ScrollCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scroll-calendar',
  templateUrl: 'scroll-calendar.html',
})
export class ScrollCalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrollCalendarPage');
  }
/*
  demo: Date;
  max: Date;
  count: Date;

  demoSettings: MbscCalendarOptions = {
    select: 'multiple'
  };

  maxSettings: MbscCalendarOptions = {
    select: 5,
    headerText: 'Pick up to 5 days'
  };

  countSettings: MbscCalendarOptions = {
    select: 'multiple',
    counter: true
  };
*/
}
