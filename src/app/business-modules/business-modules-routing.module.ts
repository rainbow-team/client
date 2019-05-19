import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorComponent } from './components/supervision/supervisor/supervisor.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent
    }, {
        path: 'supervisor',
        component: SupervisorComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class BusinessModulesRoutingModule { }

