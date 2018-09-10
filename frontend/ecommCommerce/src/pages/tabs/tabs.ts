import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CalendarPage } from "../calendar/calendar";
import { ScrollCalendarPage } from "../scroll-calendar/scroll-calendar";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CalendarPage;
  tab3Root = ScrollCalendarPage;


  constructor() {

  }
}
