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
        data: {
            breadcrumb: "监管信息 / 核安全监督员信息"
        }
    }, {
        path: 'supersivion/supervisor/add',
        component: SupervisorAddComponent,
        data: {
            breadcrumb: "监管信息 / 核安全监督员信息 / 添加"
        }
    },
    {
        path: 'supersivion/supervisor/childmanage',
        component: SupervisorChildmanageComponent,
        data: {
            breadcrumb: "监管信息 / 核安全监督员信息 / 子项管理"
        }
    },
    {
        path: 'supersivion/monitorTrain',
        component: MonitorTrainComponent,
        data: {
            breadcrumb: "监管信息 / 核安全监督培训信息"
        }
    },
    {
        path: 'supersivion/monitorTrain/add',
        component: MonitorTrainAddComponent,
        data: {
            breadcrumb: "监管信息 / 核安全监督培训信息 / 添加"
        }
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
        component: SystemComponent,
        data: {
            breadcrumb: "系统管理"
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class BusinessModulesRoutingModule { }

