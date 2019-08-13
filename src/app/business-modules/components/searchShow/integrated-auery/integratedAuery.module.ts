import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../layouts/layouts.module';
import { IntegratedAueryComponent } from './integrated-auery.component';
import { GroupAddComponent } from './../../unit/group/group-add/group-add.component';
import { ServicedepartSearchShowComponent } from './../../unit/servicedepart/servicedepart-search-show/servicedepart-search-show.component';
import { UmineSearchShowComponent } from './../../unit/umine/umine-search-show/umine-search-show.component';
import { EquipdepartSearchShowComponent } from './../../unit/equipdepart/equipdepart-search-show/equipdepart-search-show.component';
import { FacSearchShowComponent } from './../../unit/fac/fac-search-show/fac-search-show.component';
import { UmineplaceSearchShowComponent } from './../../unit/umineplace/umineplace-search-show/umineplace-search-show.component';
import { UminemountainSearchShowComponent } from './../../unit/uminemountain/uminemountain-search-show/uminemountain-search-show.component';
import { ActivityPermitAddComponent } from './../../permit/activity/activity-add/activity-add.component';
import { ActivityAddComponent } from './../../check/activity/activity-add/activity-add.component';
import { DailyAddComponent } from './../../monitor/daily/daily-add/daily-add.component';
import { CheckAddComponent } from './../../monitor/check/check-add/check-add.component';
import { WitnessAddComponent } from './../../monitor/witness/witness-add/witness-add.component';
import { SecurityFacAddComponent } from './../../security/fac/fac-add/fac-add.component';
import { AccidentAddComponent } from './../../security/accident/accident-add/accident-add.component';
import { SecurityUmineplaceAddComponent } from './../../security/umineplace/umineplace-add/umineplace-add.component';
import { EquipPermitAddComponent } from './../../permit/equip/equip-add/equip-add.component';
import { CheckEquipAddComponent } from './../../../components/check/equip/equip-add/equip-add.component';
import { SecurityEquipAddComponent } from './../../security/equip/equip-add/equip-add.component';
import { PermitFacAddComponent } from './../../permit/fac/fac-add/fac-add.component';
import { CheckFacAddComponent } from './../../check/fac/fac-add/fac-add.component';
import { UmineplacePermitAddComponent } from './../../permit/umineplace/umineplace-add/umineplace-add.component';
import { CheckUmineplaceAddComponent } from './../../check/umineplace/umineplace-add/umineplace-add.component';
import { UminemountainPermitAddComponent } from './../../permit/uminemountain/uminemountain-add/uminemountain-add.component';
import { CheckUminemountainAddComponent } from './../../check/uminemountain/uminemountain-add/uminemountain-add.component';

const routes: Routes = [
    {
        path: '',
        component: IntegratedAueryComponent
    },
    {
        path: 'groupAdd',
        component: GroupAddComponent
    },
    {
        path: 'servicedepartSearch',
        component: ServicedepartSearchShowComponent
    },
    {
        path: 'umineSearch',
        component: UmineSearchShowComponent
    },
    {
        path: 'equipdepartSearch',
        component: EquipdepartSearchShowComponent
    },
    {
        path: 'facSearch',
        component: FacSearchShowComponent
    },
    {
        path: 'umineplaceSearch',
        component: UmineplaceSearchShowComponent
    },
    {
        path: 'uminmountainSearch',
        component: UminemountainSearchShowComponent
    },
    {
        path: 'permitActivityAdd',
        component: ActivityPermitAddComponent
    },
    {
        path: 'checkActivityAdd',
        component: ActivityAddComponent
    },
    {
        path: 'monitordailyAdd',
        component: DailyAddComponent
    },
    {
        path: 'monitorcheckAdd',
        component: CheckAddComponent
    },
    {
        path: 'monitorwitnessAdd',
        component: WitnessAddComponent
    },
    {
        path: 'securityfacAdd',
        component: SecurityFacAddComponent
    },
    {
        path: 'securityaccidentAdd',
        component: AccidentAddComponent
    },
    {
        path: 'securityUmineplaceAdd',
        component: SecurityUmineplaceAddComponent
    },
    {
        path: 'permitequipAdd',
        component: EquipPermitAddComponent
    },
    {
        path: 'checkequipAdd',
        component: CheckEquipAddComponent
    },
    {
        path: 'securityequipAdd',
        component: SecurityEquipAddComponent
    },
    {
        path: 'permitfacAdd',
        component: PermitFacAddComponent
    },
    {
        path: 'checkfacAdd',
        component: CheckFacAddComponent
    },
    {
        path: 'permitumineplaceAdd',
        component: UmineplacePermitAddComponent
    },
    {
        path: 'checkumineplaceAdd',
        component: CheckUmineplaceAddComponent
    },
    {
        path: 'permituminemountainAdd',
        component: UminemountainPermitAddComponent
    },
    {
        path: 'checkuminemountainAdd',
        component:CheckUminemountainAddComponent
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
        IntegratedAueryComponent
    ]
})
export class IntegratedAueryModule { }
