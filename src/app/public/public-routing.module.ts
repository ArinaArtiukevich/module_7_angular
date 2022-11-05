import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from "./public.component";
import {MainPageComponent} from "./page/main-page/main-page.component";
import {CertificateInfoComponent} from "./components/certificate-info/certificate-info.component";
import {GlobalErrorComponent} from "./components/global-error/global-error.component";

const routes: Routes = [
  {
    path: 'certificate', component: PublicComponent,
    children: [
      {path: "", component: MainPageComponent},
      {path: ":id", component: CertificateInfoComponent}
    ]
  }, {
    path: '', component: PublicComponent,
    children: [
      {path: "error", component: GlobalErrorComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
