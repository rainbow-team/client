import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { DataMigrationComponent } from './data-migration.component';
import { LayoutsModule } from './../../../layouts/layouts.module';

const routes: Routes = [
    {
        path: '',
        component: DataMigrationComponent
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
        DataMigrationComponent
    ]
})
export class DataMigrationModule { }
