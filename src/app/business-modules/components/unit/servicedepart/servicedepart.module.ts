import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { ServicedepartComponent } from './servicedepart.component';
import { ServicedepartAddComponent } from './servicedepart-add/servicedepart-add.component';
import { ServicedepartReportmanageComponent } from './servicedepart-reportmanage/servicedepart-reportmanage.component';
import { ServicedepartSearchShowComponent } from './servicedepart-search-show/servicedepart-search-show.component';

const routes: Routes = [
    {
        path: '',
        component: ServicedepartComponent
    },
    {
        path: 'add',
        component: ServicedepartAddComponent
    },
    {
        path: 'childmanage',
        component: ServicedepartReportmanageComponent
    }, {
        path: 'SearchShow',
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
        // ServicedepartComponent,
        ServicedepartAddComponent,
        ServicedepartReportmanageComponent,
        ServicedepartSearchShowComponent
    ]
})
export class ServiceDepartModule { }
