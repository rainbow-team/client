import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingCenterComponent } from './components/setting-center/setting-center.component';
import { NestingSettingComponent } from './components/nesting-setting/nesting-setting.component';
import { LayerManageComponent } from './components/layer-manage/layer-manage.component';
import { OrgstaffManageComponent } from './components/orgstaff-manage/orgstaff-manage.component';
import { PostManageComponent } from './components/post-manage/post-manage.component';
import { ParamSettingComponent } from './components/param-setting/param-setting.component';
import { StaffDetailComponent } from './components/orgstaff-manage/staff-detail/staff-detail.component';
import { PostDetailComponent } from './components/post-manage/post-detail/post-detail.component';
import { HaqjdyComponent } from './components/haqjdy/haqjdy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SettingRoutingModule
  ],
  declarations: [
    NestingSettingComponent,
    LayerManageComponent,
    OrgstaffManageComponent,
    StaffDetailComponent,
    PostManageComponent,
    PostDetailComponent,
    ParamSettingComponent,
    SettingCenterComponent,
    HaqjdyComponent
  ]
})
export class SettingModule { }
