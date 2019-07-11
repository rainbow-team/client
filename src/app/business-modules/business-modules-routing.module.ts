import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessModulesComponent } from './business-modules.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: BusinessModulesComponent,
        children: [
            { path: '', loadChildren: './components/home/home.module#HomeModule' }
        ]
    },
    {
        path: 'supersivion',
        component: BusinessModulesComponent,
        children: [
            { path: 'sastind', loadChildren: './components/supervision/sastind/sastind.module#SastindModule' },
            { path: 'org', loadChildren: './components/supervision/org/org.module#OrgModule' },
            { path: 'supervisor', loadChildren: './components/supervision/supervisor/supervisor.module#SupervisorModule' },
            { path: 'monitorTrain', loadChildren: './components/supervision/monitor-train/monitor-train.module#MonitorTrainModule' },
            { path: '', pathMatch: 'full', redirectTo: 'supervisor' }
        ]
    }, {
        path: 'system',
        component: BusinessModulesComponent,
        children: [
            { path: '', loadChildren: './components/system/system.module#SystemModule' }
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: '/home' }

];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class BusinessModulesRoutingModule { }

