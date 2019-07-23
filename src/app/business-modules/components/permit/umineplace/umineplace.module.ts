import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { UmineplacePermitComponent } from './umineplace.component';
import { UmineplacePermitAddComponent } from './umineplace-add/umineplace-add.component';

const routes: Routes = [
  {
    path: '',
    component: UmineplacePermitComponent
  },
  {
    path: 'add',
    component: UmineplacePermitAddComponent
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
  declarations: [UmineplacePermitComponent, UmineplacePermitAddComponent]
})
export class UmineplacePermitModule {}
