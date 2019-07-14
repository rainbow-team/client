import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { OperatorlisenceComponent } from './operatorlisence.component';
import { OperatorlisenceAddComponent } from './operatorlisence-add/operatorlisence-add.component';

const routes: Routes = [
    {
        path: '',
        component: OperatorlisenceComponent
    },
    {
        path: 'add',
        component: OperatorlisenceAddComponent
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
        OperatorlisenceComponent,
        OperatorlisenceAddComponent
    ]
})
export class OperatorLisenceModule { }
