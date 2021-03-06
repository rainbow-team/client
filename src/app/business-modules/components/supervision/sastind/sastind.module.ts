import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { SastindComponent } from './sastind.component';
import { SastindAddComponent } from './sastind-add/sastind-add.component';

const routes: Routes = [
    {
        path: '',
        component: SastindComponent
    },
    {
        path: 'add',
        component: SastindAddComponent
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
        SastindComponent,
        SastindAddComponent
    ]
})
export class SastindModule { }
