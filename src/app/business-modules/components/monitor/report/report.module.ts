import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { ReportComponent } from './report.component';
import { ReportAddComponent } from './report-add/report-add.component';

const routes: Routes = [
    {
        path: '',
        component: ReportComponent
    },
    {
        path: 'add',
        component: ReportAddComponent
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
        // ReportComponent,
        // ReportAddComponent
    ]
})
export class ReportModule { }
