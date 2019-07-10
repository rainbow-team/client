import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BusinessModulesRoutingModule } from './business-modules-routing.module';
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
    BusinessModulesComponent
  ]
})
export class BusinessModulesModule { }
