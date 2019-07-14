import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { ExpertComponent } from './expert.component';
import { ExpertAddComponent } from './expert-add/expert-add.component';

const routes: Routes = [
    {
        path: '',
        component: ExpertComponent
    },
    {
        path: 'add',
        component: ExpertAddComponent
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
        ExpertComponent,
        ExpertAddComponent
    ]
})
export class ExpertModule { }
