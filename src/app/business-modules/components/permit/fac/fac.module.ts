import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { FacComponent } from './fac.component';
import { FacAddComponent } from './fac-add/fac-add.component';

const routes: Routes = [
    {
        path: '',
        component: FacComponent
    },
    {
        path: 'add',
        component: FacAddComponent
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
        FacComponent,
        FacAddComponent
    ]
})
export class FacModule { }
