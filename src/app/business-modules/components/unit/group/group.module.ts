import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './../../../../layouts/layouts.module';
import { GroupComponent } from './group.component';
import { GroupAddComponent } from './group-add/group-add.component';

const routes: Routes = [
    {
        path: '',
        component: GroupComponent
    },
    {
        path: 'add',
        component: GroupAddComponent
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
        GroupComponent,
        GroupAddComponent
    ]
})
export class GroupModule { }
