import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAddModalPage } from './customer-add-modal';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CustomerAddModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddModalPage),
    ComponentsModule,
  ],
})
export class CustomerAddModalPageModule {}
