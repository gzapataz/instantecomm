import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessionalDetailPage } from './professional-detail';

@NgModule({
  declarations: [
    ProfessionalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessionalDetailPage),
  ],
})
export class ProfessionalDetailPageModule {}
