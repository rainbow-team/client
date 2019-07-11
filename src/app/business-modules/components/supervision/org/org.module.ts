import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { OrgComponent } from './org.component';
import { OrgAddComponent } from './org-add/org-add.component';

const routes: Routes = [
    {
        path: '',
        component: OrgComponent
    },
    {
        path: 'add',
        component: OrgAddComponent
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
        OrgComponent,
        OrgAddComponent
    ]
})
export class OrgModule { }
