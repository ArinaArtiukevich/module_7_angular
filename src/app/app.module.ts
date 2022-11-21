import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PublicModule} from "./public/public.module";
import {UserModule} from "./user/user.module";
import {ItemFormsModule} from "./item-forms/item-forms.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    // AuthModule,
    // UserModule,
    PublicModule,
    // ItemFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
