import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './layouts/components/login/login.component';
import { IndexComponent } from './layouts/components/index/index.component';

const appRoutes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'index',
  component: IndexComponent,
  children: [
    {
      path: '',
      loadChildren: './business-modules/business-modules#BusinessModulesModule'
    }
  ]
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: '/login'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
