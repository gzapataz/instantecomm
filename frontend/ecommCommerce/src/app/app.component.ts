import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {AngularFireAuth} from "angularfire2/auth";
import {UserServiceProvider} from "../providers/user-service/user-service";

@Component({
  selector:'login-style',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  loginPage: any;
  loggedIn: any;
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth: AngularFireAuth, private userService: UserServiceProvider,
              private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      splashScreen.hide();
      this.loginPage = 'LoginPage';
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user)
          this.loggedIn = user.email;
      });
    });
  }


    showPlatform() {
      let text = 'Corriendo en: ' + this.platform.platforms();
      let alert = this.alertCtrl.create({
        title: 'Home',
        subTitle: text,
        buttons: ['Ok']
      });
      alert.present();
    }


  signOff() {
    this.userService.logOut();
    this.loggedIn = '';
    this.nav.push(LoginPage);
  }
}

