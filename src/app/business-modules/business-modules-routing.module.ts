import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SystemComponent } from './components/system/system.component';
import { SupervisorComponent } from './components/supervision/supervisor/supervisor.component';
import { SupervisorAddComponent } from './components/supervision/supervisor/supervisor-add/supervisor-add.component';
import { SupervisorChildmanageComponent } from './components/supervision/supervisor/supervisor-childmanage/supervisor-childmanage.component';
import { MonitorTrainComponent } from './components/supervision/monitor-train/monitor-train.component';
import { MonitorTrainAddComponent } from './components/supervision/monitor-train/monitor-train-add/monitor-train-add.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        data: {
            breadcrumb: "首页"
        }
    },
    //暂时
    {
        path: 'supersivion/supervisor',
        component: SupervisorComponent,
    }, {
        path: 'supersivion/supervisor/add',
        component: SupervisorAddComponent,
    },
    {
        path: 'supersivion/supervisor/childmanage',
        component: SupervisorChildmanageComponent,
    },
    {
        path: 'supersivion/monitorTrain',
        component: MonitorTrainComponent
    },
    {
        path: 'supersivion/monitorTrain/add',
        component:MonitorTrainAddComponent
    }
    //     children: [
    // {
    //     path: 'supervisor',
    //     children: [
    //         {
    //             path: '',
    //             loadChildren: './components/supervision/supervisor/supervisor-modules#SupervisorModule'
    //         },
    //         {
    //             path: 'add',
    //             loadChildren: './components/supervision/supervisor/supervisor-add/supervisor-add-modules#SupervisionAddModule'
    //         }

    //     ]
    // }

    , {
        path: 'system',
        component: SystemComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class BusinessModulesRoutingModule { }

