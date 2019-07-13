import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { LawComponent } from './law.component';
import { LawAddComponent } from './law-add/law-add.component';

const routes: Routes = [
    {
        path: '',
        component: LawComponent
    },
    {
        path: 'add',
        component: LawAddComponent
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
        LawComponent,
        LawAddComponent
    ]
})
export class LawModule { }
