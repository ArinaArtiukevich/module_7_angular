import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { MainPageComponent } from './page/main-page/main-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { ScrolltopComponent } from './components/scrolltop/scrolltop.component';
import {FormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {CertificateInfoComponent} from "./components/certificate-info/certificate-info.component";
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';


@NgModule({
  declarations: [
    PublicComponent,
    NavbarComponent,
    DropdownComponent,
    ClickOutsideDirective,
    MainPageComponent,
    CategoriesComponent,
    CertificateComponent,
    ScrolltopComponent,
    CertificateInfoComponent,
    GlobalErrorComponent,
    CustomCurrencyPipe
  ],
  exports: [
    NavbarComponent,
    GlobalErrorComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class PublicModule { }
