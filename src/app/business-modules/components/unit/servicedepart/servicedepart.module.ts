import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { ServicedepartComponent } from './servicedepart.component';
import { ServicedepartAddComponent } from './servicedepart-add/servicedepart-add.component';

const routes: Routes = [
    {
        path: '',
        component: ServicedepartComponent
    },
    {
        path: 'add',
        component: ServicedepartAddComponent
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
        ServicedepartComponent,
        ServicedepartAddComponent
    ]
})
export class ServiceDepartModule { }
