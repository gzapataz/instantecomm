import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { firebaseConfig } from '../environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter, DateAdapter } from "angular-calendar";
import { CalendarWeekHoursViewModule } from "angular-calendar-week-hours-view";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AppointmentPage } from "../pages/appointment/appointment";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule } from "@ionic/storage";
import { CustomEventTittleFormatterProvider } from '../providers/custom-event-tittle-formatter/custom-event-tittle-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AppointmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
/*
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AppointmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    CustomEventTittleFormatterProvider,
    CustomDateFormatterProvider
  ]
})
export class AppModule {}
