import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrollCalendarPage } from './scroll-calendar';

@NgModule({
  declarations: [
    ScrollCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(ScrollCalendarPage),
  ],
})
export class ScrollCalendarPageModule {}
