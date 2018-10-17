import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {AngularFireAuth} from "angularfire2/auth";
import {UserServiceProvider} from "../providers/user-service/user-service";
import {HomePage} from "../pages/home/home";
import {CalendarPage} from "../pages/calendar/calendar";
import {CustomerPage} from "../pages/customer/customer";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@Component({
  selector:'login-style',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[] = [



    { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Mi Agenda', pageName: 'CalendarPage', tabComponent: 'CalendarPage', index: 1, icon: 'calendar' },
    { title: 'Mis Pacientes', pageName: 'CustomerPage',tabComponent: 'CustomerPage', index: 2, icon: 'contacts' },
  ];


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

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}

