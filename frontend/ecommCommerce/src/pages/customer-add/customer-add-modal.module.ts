import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAddModalPage } from './customer-add-modal';

@NgModule({
  declarations: [
    CustomerAddModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddModalPage),
  ],
})
export class CustomerAddModalPageModule {}
