import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {MainPageComponent} from "./pages/main-page/main-page.component";
// import {RegistrationComponent} from "./pages/registration/registration.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {CertificatePageComponent} from "./pages/certificate-page/certificate-page.component";
// import {FormCertificateComponent} from "./components/form-certificate/form-certificate.component";
// import {FormTagComponent} from "./components/form-tag/form-tag.component";
// import {GlobalErrorComponent} from "./components/global-error/global-error.component";

const routes: Routes = [
  // {path: '', component: MainPageComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'registration', component: RegistrationComponent},
  // {path: 'userInfo', component: UserPageComponent},
  // {path: 'cart', component: CartPageComponent},
  // {path: 'certificate/:id', component: CertificatePageComponent},
  // {path: 'addCertificate', component: FormCertificateComponent},
  // {path: 'updateCertificate/:id', component: FormCertificateComponent},
  // {path: 'addTag', component: FormTagComponent},
  // {path: 'error', component: GlobalErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
