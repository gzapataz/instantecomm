import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerWhatsappPage } from './customer-whatsapp';

@NgModule({
  declarations: [
    CustomerWhatsappPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerWhatsappPage),
  ],
})
export class CustomerWhatsappPageModule {}
