import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { DailyAddComponent } from './daily-add/daily-add.component';
import { DailyComponent } from './daily.component';

const routes: Routes = [
    {
        path: '',
        component: DailyComponent
    },
    {
        path: 'add',
        component: DailyAddComponent
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
        DailyComponent,
        DailyAddComponent
    ]
})
export class DailyModule { }
