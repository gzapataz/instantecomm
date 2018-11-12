import {Component, OnInit} from '@angular/core';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsServiceProvider } from "../../providers/globals-service/globals-service";
import {ProfessionalClass} from "../../classes/ProfessionalClass";


/**
 * Generated class for the ProfessionalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professional-detail',
  templateUrl: 'professional-detail.html',
})
export class ProfessionalDetailPage implements OnInit {

  loggedUser;
  professional: ProfessionalClass;
  nombre = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserServiceProvider,
              private globalService: GlobalsServiceProvider) {
  }

  ngOnInit() {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    console.log('usuario:' + JSON.stringify(this.loggedUser));

    this.userService.getUserData(this.loggedUser.userId).subscribe(
      result => {
          this.professional = result;
          this.nombre = this.professional['person'].personName.firstName;
          console.log ('Profesional:' + JSON.stringify(this.professional))
        }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionalDetailPage');
  }

}
