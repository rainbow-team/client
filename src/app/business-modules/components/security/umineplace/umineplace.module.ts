import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { SecurityUmineplaceComponent } from './umineplace.component';
import { SecurityUmineplaceAddComponent } from './umineplace-add/umineplace-add.component';

const routes: Routes = [
    {
        path: '',
        component: SecurityUmineplaceComponent
    },
    {
        path: 'add',
        component: SecurityUmineplaceAddComponent
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
        // SecurityUmineplaceComponent,
        // SecurityUmineplaceAddComponent
    ]
})
export class UmineplaceSecurityModule { }
