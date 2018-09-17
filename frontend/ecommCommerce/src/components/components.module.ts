import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { CustomerSearchComponent } from './customer-search/customer-search';
@NgModule({
	declarations: [CustomerSearchComponent],
	imports: [ CommonModule, IonicModule ],
	exports: [ CustomerSearchComponent ]
})
export class ComponentsModule {}
