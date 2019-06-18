import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BusinessModulesRoutingModule } from './business-modules-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SystemComponent } from './components/system/system.component';

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
    SystemComponent
  ]
})
export class BusinessModulesModule { }
