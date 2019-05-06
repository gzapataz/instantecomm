import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import {DragulaModule} from "ng2-dragula";
import {ComponentsModule} from "../../components/components.module";
import {NgCalendarModule} from "ionic2-calendar";

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    DragulaModule, ComponentsModule, NgCalendarModule
  ],
})
export class CalendarPageModule {}
