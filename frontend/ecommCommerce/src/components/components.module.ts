import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { CustomerSearchComponent } from './customer-search/customer-search';
import { AlertmsgComponent } from './alertmsg/alertmsg';
@NgModule({
	declarations: [CustomerSearchComponent,
    AlertmsgComponent],
	imports: [ CommonModule, IonicModule ],
	exports: [ CustomerSearchComponent,
    AlertmsgComponent ]
})
export class ComponentsModule {}
