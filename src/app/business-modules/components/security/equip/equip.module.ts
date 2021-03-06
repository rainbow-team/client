import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { SecurityEquipComponent } from './equip.component';
import { SecurityEquipAddComponent } from './equip-add/equip-add.component';

const routes: Routes = [
    {
        path: '',
        component: SecurityEquipComponent
    },
    {
        path: 'add',
        component: SecurityEquipAddComponent
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
        // SecurityEquipComponent,
        // SecurityEquipAddComponent
    ]
})
export class EquipSecurityModule { }
