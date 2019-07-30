import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../layouts/layouts.module';
import { SystemComponent } from './system.component';
import { SettingComponent } from './setting/setting.component';
import { OrgComponent } from './org/org.component';
import { SystemMenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    SystemComponent,
    SettingComponent,
    OrgComponent,
    RoleComponent,
    UserComponent,
    SystemMenuComponent
  ]
})
export class SystemModule {}
