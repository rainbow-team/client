import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BusinessModulesRoutingModule } from './business-modules-routing.module';
import { SystemComponent } from './components/system/system.component';
import { SettingComponent } from './components/system/setting/setting.component';


import { MonitorTrainComponent } from './components/supervision/monitor-train/monitor-train.component';
import { MonitorTrainAddComponent } from './components/supervision/monitor-train/monitor-train-add/monitor-train-add.component';
import { BusinessModulesComponent } from './business-modules.component';
import { LayoutsModule } from './../layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BusinessModulesRoutingModule,
    LayoutsModule
  ],
  declarations: [
    SystemComponent,
    SettingComponent,

    MonitorTrainComponent,
    MonitorTrainAddComponent,
    BusinessModulesComponent
  ]
})
export class BusinessModulesModule { }
