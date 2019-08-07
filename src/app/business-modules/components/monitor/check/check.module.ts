import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { CheckComponent } from './check.component';
import { CheckAddComponent } from './check-add/check-add.component';

const routes: Routes = [
    {
        path: '',
        component: CheckComponent
    },
    {
        path: 'add',
        component: CheckAddComponent
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
        // CheckComponent,
        CheckAddComponent
    ]
})
export class CheckModule { }
