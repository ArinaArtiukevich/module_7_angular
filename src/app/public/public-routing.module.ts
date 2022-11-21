import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./page/main-page/main-page.component";
import {CertificateInfoComponent} from "./components/certificate-info/certificate-info.component";

const routes: Routes = [
      {path: "", component: MainPageComponent},
      {path: ":id", component: CertificateInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
