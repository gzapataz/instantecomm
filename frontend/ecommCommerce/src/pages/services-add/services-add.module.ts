import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesAddPage } from './services-add';

@NgModule({
  declarations: [
    ServicesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesAddPage),
  ],
})
export class ServicesAddPageModule {}
