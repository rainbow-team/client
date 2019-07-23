import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { ActivityPermitComponent } from './activity.component';
import { ActivityPermitAddComponent } from './activity-add/activity-add.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityPermitComponent
  },
  {
    path: 'add',
    component: ActivityPermitAddComponent
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
  declarations: [ActivityPermitComponent, ActivityPermitAddComponent]
})
export class ActivityPermitModule {}
