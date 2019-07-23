import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { EquipPermitComponent } from './equip.component';
import { EquipPermitAddComponent } from './equip-add/equip-add.component';

const routes: Routes = [
  {
    path: '',
    component: EquipPermitComponent
  },
  {
    path: 'add',
    component: EquipPermitAddComponent
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
  declarations: [EquipPermitComponent, EquipPermitAddComponent]
})
export class EquipPermitModule {}
