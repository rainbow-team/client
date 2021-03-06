import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { CheckUminemountainComponent } from './uminemountain.component';
import { CheckUminemountainAddComponent } from './uminemountain-add/uminemountain-add.component';
import { UminemountainFileComponent } from "./uminemountain-file/uminemountain-file.component";

const routes: Routes = [
    {
        path: '',
        component: CheckUminemountainComponent
    },
    {
        path: 'add',
        component: CheckUminemountainAddComponent
    },
    {
        path: 'uminemountainfile',
        component: UminemountainFileComponent
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
        // CheckUminemountainComponent,
        // CheckUminemountainAddComponent,
        // UminemountainFileComponent
    ]
})
export class UminemountainModule { }
