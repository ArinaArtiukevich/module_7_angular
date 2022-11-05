import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInfoComponent} from "./components/user-info/user-info.component";
import {UserComponent} from "./user.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      {path: 'info/:id', component: UserInfoComponent},
      {path: 'cart', component: CartComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
