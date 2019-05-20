import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SupervisionRoutingModule } from './supervision-routing.module';
import { SupervisorComponent } from './supervisor/supervisor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SupervisionRoutingModule
  ],
  declarations: [
    SupervisorComponent
  ]
})
export class SupervisionModule { }
