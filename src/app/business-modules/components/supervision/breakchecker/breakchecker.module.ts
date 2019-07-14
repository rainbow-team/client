import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { BreakcheckerComponent } from './breakchecker.component';
import { BreakcheckerAddComponent } from './breakchecker-add/breakchecker-add.component';

const routes: Routes = [
    {
        path: '',
        component: BreakcheckerComponent
    },
    {
        path: 'add',
        component: BreakcheckerAddComponent
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
        BreakcheckerComponent,
        BreakcheckerAddComponent
    ]
})
export class BreakCheckerModule { }
