import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BusinessModulesRoutingModule } from './business-modules-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SystemComponent } from './components/system/system.component';
import { SettingComponent } from './components/system/setting/setting.component';
import { SupervisorComponent } from './components/supervision/supervisor/supervisor.component';
import { SupervisorAddComponent } from './components/supervision/supervisor/supervisor-add/supervisor-add.component';
import { SupervisorChildmanageComponent } from './components/supervision/supervisor/supervisor-childmanage/supervisor-childmanage.component';
import { MonitorTrainComponent } from './components/supervision/monitor-train/monitor-train.component';
import { MonitorTrainAddComponent } from './components/supervision/monitor-train/monitor-train-add/monitor-train-add.component';
import { ValidationDirective } from './../layouts/_directives/validation.directive';
import { RecordtimePipe } from './../layouts/_pipes/recordtime.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BusinessModulesRoutingModule
  ],
  declarations: [
    HomeComponent,
    SystemComponent,
    SettingComponent,
    SupervisorComponent,
    SupervisorAddComponent,
    SupervisorChildmanageComponent,
    MonitorTrainComponent,
    MonitorTrainAddComponent,
    ValidationDirective,
    RecordtimePipe
  ]
})
export class BusinessModulesModule { }
