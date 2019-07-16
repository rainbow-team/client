import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { EquipdepartComponent } from './equipdepart.component';
import { EquipdepartAddComponent } from './equipdepart-add/equipdepart-add.component';

const routes: Routes = [
    {
        path: '',
        component: EquipdepartComponent
    },
    {
        path: 'add',
        component: EquipdepartAddComponent
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
        EquipdepartComponent,
        EquipdepartAddComponent
    ]
})
export class EquipDepartModule { }
