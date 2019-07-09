import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SupervisorComponent } from './supervisor.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { SupervisorAddComponent } from './supervisor-add/supervisor-add.component';
import { SupervisorChildmanageComponent } from './supervisor-childmanage/supervisor-childmanage.component';

const routes: Routes = [
  {
    path: '',
    component: SupervisorComponent
  },
  {
    path: 'add',
    component: SupervisorAddComponent
  }, {
    path: 'childmanage',
    component: SupervisorChildmanageComponent
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
    SupervisorComponent,
    SupervisorAddComponent,
    SupervisorChildmanageComponent
  ]
})
export class SupervisorModule { }
