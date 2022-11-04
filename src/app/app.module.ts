import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CertificateComponent} from './components/certificate/certificate.component';
import {HttpClientModule} from "@angular/common/http";
import {GlobalErrorComponent} from './components/global-error/global-error.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ClickOutsideDirective} from './derictive/click-outside.directive';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {ScrolltopComponent} from './components/scrolltop/scrolltop.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {CategoriesComponent} from './components/categories/categories.component';
import {LoginComponent} from './components/login/login.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from './pages/registration/registration.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {CartPageComponent} from './pages/cart-page/cart-page.component';
import {CartComponent} from './components/cart/cart.component';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {CertificateInfoComponent} from './components/certificate-info/certificate-info.component';
import {CertificatePageComponent} from './pages/certificate-page/certificate-page.component';
import {AddCertificatePageComponent} from './pages/add-certificate-page/add-certificate-page.component';
import {FormCertificateComponent} from './components/form-certificate/form-certificate.component';
import {FormTagComponent} from './components/form-tag/form-tag.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CertificateComponent,
    GlobalErrorComponent,
    NavbarComponent,
    ClickOutsideDirective,
    DropdownComponent,
    ScrolltopComponent,
    CategoriesComponent,
    LoginComponent,
    LoginPageComponent,
    MainPageComponent,
    RegistrationComponent,
    SignupComponent,
    UserPageComponent,
    CartPageComponent,
    CartComponent,
    UserInfoComponent,
    CertificateInfoComponent,
    CertificatePageComponent,
    AddCertificatePageComponent,
    FormCertificateComponent,
    FormTagComponent,
    CustomCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
