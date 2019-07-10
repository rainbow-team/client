import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { MonitorTrainComponent } from './monitor-train.component';
import { MonitorTrainAddComponent } from './monitor-train-add/monitor-train-add.component';

const routes: Routes = [
    {
        path: '',
        component: MonitorTrainComponent
    },
    {
        path: 'add',
        component: MonitorTrainAddComponent
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
        MonitorTrainComponent,
        MonitorTrainAddComponent
    ]
})
export class MonitorTrainModule { }
