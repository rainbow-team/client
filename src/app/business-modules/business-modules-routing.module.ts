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
            { path: 'producetrain', loadChildren: './components/supervision/producetrain/producetrain.module#ProducetrainModule' },
            { path: 'expert', loadChildren: './components/supervision/expert/expert.module#ExpertModule' },
            { path: 'law', loadChildren: './components/supervision/law/law.module#LawModule' },
            { path: 'welder', loadChildren: './components/supervision/welder/welder.module#WelderModule' },
            { path: 'breakchecker', loadChildren: './components/supervision/breakchecker/breakchecker.module#BreakCheckerModule' },
            { path: 'operatorlisence', loadChildren: './components/supervision/operatorlisence/operatorlisence.module#OperatorLisenceModule' },
            { path: '', pathMatch: 'full', redirectTo: 'supervisor' }
        ]
    }, 
    {
        path: 'unit',
        component: BusinessModulesComponent,
        children: [
            { path: 'group', loadChildren: './components/unit/group/group.module#GroupModule' },
            { path: 'servicedepart', loadChildren: './components/unit/servicedepart/servicedepart.module#ServiceDepartModule' },
            { path: 'umine', loadChildren: './components/unit/umine/umine.module#UmineModule' },
            { path: 'equipdepart', loadChildren: './components/unit/equipdepart/equipdepart.module#EquipDepartModule' },
            { path: 'fac', loadChildren: './components/unit/fac/fac.module#FacModule' },
            { path: 'umineplace', loadChildren: './components/unit/umineplace/umineplace.module#UmineplaceModule' },
            { path: 'uminemountain', loadChildren: './components/unit/uminemountain/uminemountain.module#UminemountainModule' }
        ]
    }, 
    {
        path: 'check',
        component: BusinessModulesComponent,
        children: [
            { path: 'fac', loadChildren: './components/check/fac/fac.module#FacModule' },
            { path: 'equip', loadChildren: './components/check/equip/equip.module#EquipModule' },
            { path: 'activity', loadChildren: './components/check/activity/activity.module#ActivityModule' },
            { path: 'umineplace', loadChildren: './components/check/umineplace/umineplace.module#UmineplaceModule' },
            { path: 'uminemountain', loadChildren: './components/check/uminemountain/uminemountain.module#UminemountainModule' }
        ]
    }, 
    {
        path: 'monitor',
        component: BusinessModulesComponent,
        children: [
            { path: 'daily', loadChildren: './components/monitor/daily/daily.module#DailyModule' },
            { path: 'check', loadChildren: './components/monitor/check/check.module#CheckModule' },
            { path: 'witness', loadChildren: './components/monitor/witness/witness.module#WitnessModule' },
            { path: 'report', loadChildren: './components/monitor/report/report.module#ReportModule' }
        ]
    }, 
    {
        path: 'security',
        component: BusinessModulesComponent,
        children: [
            { path: 'fac', loadChildren: './components/security/fac/fac.module#FacModule' },
            { path: 'equip', loadChildren: './components/security/equip/equip.module#EquipModule' },
            { path: 'umineplace', loadChildren: './components/security/umineplace/umineplace.module#UmineplaceModule' },
            { path: 'accident', loadChildren: './components/security/accident/accident.module#AccidentModule' }
        ]
    }, 
    {
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

