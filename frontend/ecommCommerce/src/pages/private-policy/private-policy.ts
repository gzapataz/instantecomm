import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrivatePolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private-policy',
  templateUrl: 'private-policy.html',
})
export class PrivatePolicyPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivatePolicyPage');
  }
}
