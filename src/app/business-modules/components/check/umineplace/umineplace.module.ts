import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { UmineplaceComponent } from './umineplace.component';
import { UmineplaceAddComponent } from './umineplace-add/umineplace-add.component';
import { UmineplaceFileComponent } from './umineplace-file/umineplace-file.component';

const routes: Routes = [
    {
        path: '',
        component: UmineplaceComponent
    },
    {
        path: 'add',
        component: UmineplaceAddComponent
    },
    {
        path: 'umineplacefile',
        component: UmineplaceFileComponent
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
        UmineplaceComponent,
        UmineplaceAddComponent,
        UmineplaceFileComponent
    ]
})
export class UmineplaceModule { }
