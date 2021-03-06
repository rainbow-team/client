import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { ProducetrainComponent } from './producetrain.component';
import { ProducetrainAddComponent } from './producetrain-add/producetrain-add.component';

const routes: Routes = [
    {
        path: '',
        component: ProducetrainComponent
    },
    {
        path: 'add',
        component: ProducetrainAddComponent
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
        ProducetrainComponent,
        ProducetrainAddComponent
    ]
})
export class ProducetrainModule { }
