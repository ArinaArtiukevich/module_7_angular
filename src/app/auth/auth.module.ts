import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import {RouterModule} from "@angular/router";
import { AuthRoutingModule } from './auth-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
