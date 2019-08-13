import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { CheckFacComponent } from './fac.component';
import { CheckFacAddComponent } from './fac-add/fac-add.component';
import { CheckFacFileComponent } from './fac-file/fac-file.component';

const routes: Routes = [
    {
        path: '',
        component: CheckFacComponent
    },
    {
        path: 'add',
        component: CheckFacAddComponent
    },
    {
        path: 'facfile',
        component: CheckFacFileComponent
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
        // CheckFacComponent,
        // CheckFacAddComponent,
        // CheckFacFileComponent
    ]
})
export class FacModule { }
