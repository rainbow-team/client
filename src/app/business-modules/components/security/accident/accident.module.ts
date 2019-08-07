import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { AccidentComponent } from './accident.component';
import { AccidentAddComponent } from './accident-add/accident-add.component';

const routes: Routes = [
    {
        path: '',
        component: AccidentComponent
    },
    {
        path: 'add',
        component: AccidentAddComponent
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
        // AccidentComponent,
        AccidentAddComponent
    ]
})
export class AccidentSecurityModule { }
