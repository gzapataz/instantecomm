import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { firebaseConfig } from '../environment';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule } from "@ionic/storage";
import { DragulaModule } from "ng2-dragula";
import { DragulaService } from "ng2-dragula";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgCalendarModule  } from 'ionic2-calendar';
import { HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ComponentsModule } from "../components/components.module";
import { CustomerSearchComponent } from "../components/customer-search/customer-search";
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from "../pages/calendar/calendar";
import { ReferalPage } from "../pages/referal/referal";
import { PaymentsPage } from "../pages/payments/payments";
import { ServiceServiceProvider } from '../providers/service-service/service-service';
import { CustomerServiceProvider } from '../providers/customer-service/customer-service';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { AppointmentServiceProvider } from '../providers/appointment-service/appointment-service';
import { CustomerPage } from "../pages/customer/customer";
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';
import { PreferencesServiceProvider } from '../providers/preferences-service/preferences-service';
import { GlobalsServiceProvider } from '../providers/globals-service/globals-service';
import { ExceptionServiceProvider } from '../providers/exception-service/exception-service';
import { CustomerAddServiceProvider } from "../providers/customer-add-service/customer-add-service";
import { ServicesPage } from "../pages/services/services";
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { LoginPage } from "../pages/login/login";
import {CustomerUpdateDetailProvider} from "../providers/customer-update-detail/customer-update-detail";
import {RestApiProvider} from "../providers/countries-service/countries-service";

import { NgxVcardModule } from 'ngx-vcard';


@NgModule({
  declarations: [
    MyApp,
    CalendarPage,
    CustomerPage,
    TabsPage,
    ServicesPage,
    ReferalPage,
    PaymentsPage
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DragulaModule,
    BrowserAnimationsModule,
    NgCalendarModule,
    HttpClientModule,
    ComponentsModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    DragulaModule,
    NgxVcardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage,
    CustomerPage,
    TabsPage,
    ServicesPage,
    ReferalPage,
    PaymentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    DragulaService,
    ServiceServiceProvider,
    CustomerServiceProvider,
    MessageServiceProvider,
    CustomerSearchComponent,
    AppointmentServiceProvider,
    ScheduleServiceProvider,
    PreferencesServiceProvider,
    GlobalsServiceProvider,

    ScreenOrientation,
    ExceptionServiceProvider,

    CustomerAddServiceProvider,
    AuthenticationServiceProvider,
    CustomerUpdateDetailProvider,
    RestApiProvider

  ]
})
export class AppModule {}
