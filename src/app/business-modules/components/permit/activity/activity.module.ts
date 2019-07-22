import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { ActivityComponent } from './activity.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent
  },
  {
    path: 'add',
    component: ActivityAddComponent
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
  declarations: [ActivityComponent, ActivityAddComponent]
})
export class ActivityModule {}
