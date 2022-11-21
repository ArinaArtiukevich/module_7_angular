import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {ItemFormsComponent} from "./item-forms/item-forms.component";
import {UserComponent} from "./user/user.component";
import {PublicComponent} from "./public/public.component";
import {GlobalErrorComponent} from "./public/components/global-error/global-error.component";

const routes: Routes = [
  {
    path: 'certificate',
    component: PublicComponent,
    loadChildren: () => import('./public/public.module').then(x => x.PublicModule)
  }, {
    path: "error", component: GlobalErrorComponent
  },
  {
    path: 'auth', component: AuthComponent, loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  }, {
    path: 'form',
    component: ItemFormsComponent,
    loadChildren: () => import('./item-forms/item-forms-routing.module').then(x => x.ItemFormsRoutingModule)
  }, {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./user/user-routing.module').then(x => x.UserRoutingModule)
  }, {
    path: '**', redirectTo: 'certificate'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
