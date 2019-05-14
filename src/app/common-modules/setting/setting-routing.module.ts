import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingCenterComponent } from './components/setting-center/setting-center.component';
import { NestingSettingComponent } from './components/nesting-setting/nesting-setting.component';
import { ParamSettingComponent } from './components/param-setting/param-setting.component';
import { OrgstaffManageComponent } from './components/orgstaff-manage/orgstaff-manage.component';
import { PostManageComponent } from './components/post-manage/post-manage.component';
import { LayerManageComponent } from './components/layer-manage/layer-manage.component';
import { StaffDetailComponent } from './components/orgstaff-manage/staff-detail/staff-detail.component';
import { HaqjdyComponent } from './components/haqjdy/haqjdy.component';

const appRoutes: Routes = [{
  path: '',
  component: SettingCenterComponent,
  children: [{
    path: 'thsz',
    component: NestingSettingComponent
  }, {
    path: 'cssz',
    component: ParamSettingComponent
  }, {
    path: 'jgry',
    component: OrgstaffManageComponent
  }, {
    path: 'rybj/:id',
    component: StaffDetailComponent
  }, {
    path: 'gwgl',
    component: PostManageComponent
  }, {
    path: 'tcgl',
    component: LayerManageComponent
  }, {
    path: 'haqjdy',
    component: HaqjdyComponent
  }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

