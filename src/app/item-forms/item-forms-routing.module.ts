import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemFormsComponent} from "./item-forms.component";
import {FormTagComponent} from "./components/form-tag/form-tag.component";
import {FormCertificateComponent} from "./components/form-certificate/form-certificate.component";

const routes: Routes = [ {
  path: 'form', component: ItemFormsComponent, children: [
    {path: 'tag', component: FormTagComponent},
    {path: 'certificate', component: FormCertificateComponent},
    {path: 'certificate/update/:id', component: FormCertificateComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemFormsRoutingModule { }
