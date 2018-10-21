import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrollHomePage } from './scroll-home';

@NgModule({
  declarations: [
    ScrollHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ScrollHomePage),
  ],
})
export class ScrollHomePageModule {}
