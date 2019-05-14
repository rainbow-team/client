import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './layouts/components/login/login.component';
import { IndexComponent } from './layouts/components/index/index.component';
import { SettingComponent } from './layouts/components/setting/setting.component';

const appRoutes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'index',
  component: IndexComponent
}, {
  path: 'setting',
  component: SettingComponent,
  children: [
    {
      path: '',
      loadChildren: './common-modules/setting/setting.module#SettingModule'
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
