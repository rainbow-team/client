import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { EquipComponent } from './equip.component';
import { EquipAddComponent } from './equip-add/equip-add.component';

const routes: Routes = [
  {
    path: '',
    component: EquipComponent
  },
  {
    path: 'add',
    component: EquipAddComponent
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
  declarations: [EquipComponent, EquipAddComponent]
})
export class EquipModule {}
