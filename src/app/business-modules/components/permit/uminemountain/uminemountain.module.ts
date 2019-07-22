import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { UminemountainComponent } from './uminemountain.component';
import { UminemountainAddComponent } from './uminemountain-add/uminemountain-add.component';

const routes: Routes = [
  {
    path: '',
    component: UminemountainComponent
  },
  {
    path: 'add',
    component: UminemountainAddComponent
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
  declarations: [UminemountainComponent, UminemountainAddComponent]
})
export class UminemountainModule {}
