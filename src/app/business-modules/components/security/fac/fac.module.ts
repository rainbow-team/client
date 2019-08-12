import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { SecurityFacComponent } from './fac.component';
import { SecurityFacAddComponent } from './fac-add/fac-add.component';


const routes: Routes = [
    {
        path: '',
        component: SecurityFacComponent
    },
    {
        path: 'add',
        component: SecurityFacAddComponent
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
        // SecurityFacComponent,
        // SecurityFacAddComponent
    ]
})
export class FacSecurityModule { }
