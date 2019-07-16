import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { UmineComponent } from './umine.component';
import { UmineAddComponent } from './umine-add/umine-add.component';

const routes: Routes = [
    {
        path: '',
        component: UmineComponent
    },
    {
        path: 'add',
        component: UmineAddComponent
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
        UmineComponent,
        UmineAddComponent
    ]
})
export class UmineModule { }
