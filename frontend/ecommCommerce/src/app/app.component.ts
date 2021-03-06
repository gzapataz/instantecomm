import {Component, ViewChild} from '@angular/core';
import {AlertController, ModalController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from "angularfire2/auth";
import { UserServiceProvider } from "../providers/user-service/user-service";
import { LoginPage } from "../pages/login/login";
import { GlobalsServiceProvider } from "../providers/globals-service/globals-service";

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
  professionalData;
  pages: PageInterface[] = [

    { title: 'Mi Agenda', pageName: 'CalendarPage', tabComponent: 'CalendarPage', index: 0, icon: 'calendar' },
    { title: 'Mis Pacientes', pageName: 'CustomerPage',tabComponent: 'CustomerPage', index: 1, icon: 'contacts' },
    { title: 'Mis Servicios', pageName: 'ServicesPage',tabComponent: 'ServicesPage', index: 2, icon: 'clipboard' }
  ];


  rootPage: any;
  loginPage: any;
  loggedIn: any;
  boton:string;
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
              private modalCtrl: ModalController,
              private userService: UserServiceProvider,
              private globalService: GlobalsServiceProvider,
              private alertCtrl: AlertController) {

    globalService.readFromStorageProfessionalData().then( professionalData => {

      console.log('Disparado0:' + JSON.stringify(professionalData));
      this.professionalData = professionalData;
      this.rootPage = TabsPage;
      if (professionalData.userId === '' || professionalData.userId == null) {
        this.rootPage = 'LoginPage';
      }

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        //statusBar.styleDefault();
        splashScreen.hide();
        //console.log('Disparado1');
        this.loginPage = 'LoginPage';
        this.afAuth.auth.onAuthStateChanged(user => {

          this.loggedIn = user.email;

          if (user) {
            this.boton="Salir";
            globalService.readFromStorageProfessionalId().then( professionalData => {
              //console.log('Disparado2:' + JSON.stringify(professionalData));
              this.rootPage = TabsPage;
          });

          }
          else {
            this.boton="Ingresar";
            this.rootPage = 'LoginPage';
          }
        });
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
    this.nav.push('LoginPage');
  }

  openPage(page: PageInterface) {
    let params = {};
    //console.log('Entrando a autenticacion PAGE:' + page);
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

  openPolicy() {
    let view = this.nav.getActive();
    //console.log(view);
    if (view.name !== 'PrivatePolicyPage') {
      this.nav.push('PrivatePolicyPage');
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

  updateProfessional() {
    console.log('this.professionalData to update:' + JSON.stringify(this.professionalData.jsonProfessional.person));
    let modal = this.modalCtrl.create('RegistrationPage', {professional: this.professionalData});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let serviceData = data;
        /*
        this.servicesService.updateService(this.loggedUser.userId, serviceData).subscribe(data => {
          serviceData._id = data._id;
        });
        */
      }
    });
  }

  goToProfessional() {
    let view = this.nav.getActive();
    //console.log(view);
    if (view.name !== 'ProfessionalDetailPage') {
      this.nav.push('ProfessionalDetailPage');
    }
  }

}

