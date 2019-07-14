import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { WelderComponent } from './welder.component';
import { WelderAddComponent } from './welder-add/welder-add.component';

const routes: Routes = [
    {
        path: '',
        component: WelderComponent
    },
    {
        path: 'add',
        component: WelderAddComponent
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
        WelderComponent,
        WelderAddComponent
    ]
})
export class WelderModule { }
