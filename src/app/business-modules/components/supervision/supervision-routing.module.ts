import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorComponent } from './supervisor/supervisor.component';

const appRoutes: Routes = [
    {
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
export class SupervisionRoutingModule { }

