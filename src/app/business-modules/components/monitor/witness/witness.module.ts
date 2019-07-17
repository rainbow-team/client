import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { WitnessComponent } from './witness.component';
import { WitnessAddComponent } from './witness-add/witness-add.component';

const routes: Routes = [
    {
        path: '',
        component: WitnessComponent
    },
    {
        path: 'add',
        component: WitnessAddComponent
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
        WitnessComponent,
        WitnessAddComponent
    ]
})
export class WitnessModule { }
