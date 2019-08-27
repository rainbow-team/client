import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './layouts/components/login/login.component';

const appRoutes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  loadChildren: './business-modules/business-modules.module#BusinessModulesModule'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
