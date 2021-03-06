import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { PermitFacComponent } from './fac.component';
import { PermitFacAddComponent } from './fac-add/fac-add.component';

const routes: Routes = [
    {
        path: '',
        component: PermitFacComponent
    },
    {
        path: 'add',
        component: PermitFacAddComponent
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
        // PermitFacAddComponent
    ]
})
export class FacModule { }
