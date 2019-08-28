import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { SimulationComponent } from './simulation.component';
import { UnitShowComponent } from './unit-show/unit-show.component';
const routes: Routes = [
  {
    path: '',
    component: SimulationComponent
  },
  {
    path: 'unit-show',
    component: UnitShowComponent
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
    // PermitFacComponent,
    SimulationComponent,
    UnitShowComponent
  ]
})
export class SimulationModule {}
