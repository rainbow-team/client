import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { IntegratedAueryComponent } from './integrated-auery.component';
import { GroupAddComponent } from './../../unit/group/group-add/group-add.component';
import { ServicedepartSearchShowComponent } from './../../unit/servicedepart/servicedepart-search-show/servicedepart-search-show.component';

const routes: Routes = [
    {
        path: '',
        component: IntegratedAueryComponent
    },
    {
        path: 'groupAdd',
        component: GroupAddComponent
    },
    {
        path: 'servicedepartSearch',
        component:ServicedepartSearchShowComponent
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
        IntegratedAueryComponent
    ]
})
export class IntegratedAueryModule { }
