import { FormsModule } from '@angular/forms';
//import { MbscModule } from '@mobiscroll/angular';
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

import { ComponentsModule } from "../components/components.module";
import { CustomerSearchComponent } from "../components/customer-search/customer-search";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';



/*
import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter, DateAdapter } from "angular-calendar";
import { CalendarWeekHoursViewModule } from "angular-calendar-week-hours-view";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
*/

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from "../pages/calendar/calendar";
import { CustomEventTittleFormatterProvider } from '../providers/custom-event-tittle-formatter/custom-event-tittle-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';
import { ScrollCalendarPage } from "../pages/scroll-calendar/scroll-calendar";
import { ServiceServiceProvider } from '../providers/service-service/service-service';
import { CustomerServiceProvider } from '../providers/customer-service/customer-service';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { AppointmentServiceProvider } from '../providers/appointment-service/appointment-service';
import { CustomerPage } from "../pages/customer/customer";
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CalendarPage,
    CustomerPage,
    //ScrollCalendarPage,
    TabsPage
  ],
  imports: [ 
    FormsModule, 
    //MbscModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    DragulaModule,
    BrowserAnimationsModule,
    NgCalendarModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalendarPage,
    CustomerPage,
    //ScrollCalendarPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    DragulaService,
    CustomEventTittleFormatterProvider,
    CustomDateFormatterProvider,
    ServiceServiceProvider,
    CustomerServiceProvider,
    MessageServiceProvider,
    CustomerSearchComponent,
    AppointmentServiceProvider,
    ScheduleServiceProvider
  ]
})
export class AppModule {}
