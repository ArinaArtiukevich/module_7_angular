import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserComponent } from './user.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    UserInfoComponent,
    UserComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
