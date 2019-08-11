import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { UminemountainPermitComponent } from './uminemountain.component';
import { UminemountainPermitAddComponent } from './uminemountain-add/uminemountain-add.component';

const routes: Routes = [
  {
    path: '',
    component: UminemountainPermitComponent
  },
  {
    path: 'add',
    component: UminemountainPermitAddComponent
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
    // UminemountainPermitComponent,
     UminemountainPermitAddComponent]
})
export class UminemountainPermitModule {}
