import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        data: {
            breadcrumb: "首页"
        }
    }, {
        path: 'supersivion',
        children: [
            {
                path: '',
                loadChildren: './components/supervision/supervision-modules#SupervisionModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class BusinessModulesRoutingModule { }

