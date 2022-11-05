import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemFormsRoutingModule } from './item-forms-routing.module';
import { FormTagComponent } from './components/form-tag/form-tag.component';
import { ItemFormsComponent } from './item-forms.component';
import { FormCertificateComponent } from './components/form-certificate/form-certificate.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormTagComponent,
    ItemFormsComponent,
    FormCertificateComponent
  ],
  imports: [
    CommonModule,
    ItemFormsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ItemFormsModule { }
