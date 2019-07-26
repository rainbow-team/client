import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../layouts/layouts.module';
import { StatisticsComponent } from './statistics.component';
import{FacReportComponent} from './fac-report/fac-report.component';

const routes: Routes = [
    {
        path: '',
        component: StatisticsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        LayoutsModule,
        RouterModule.forChild(routes),
        
    ],
    exports: [RouterModule],
    declarations: [
        StatisticsComponent,
        FacReportComponent
    ]
})
export class StatisticsModule { }
