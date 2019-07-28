import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../layouts/layouts.module';
import { StatisticsComponent } from './statistics.component';
import { FacReportComponent } from './fac-report/fac-report.component';
import { UmineplaceReportComponent } from './umineplace-report/umineplace-report.component';
import { PermitFacReportComponent } from './permit/permit-fac-report/permit-fac-report.component';
import { PermitEquipReportComponent } from './permit/permit-equip-report/permit-equip-report.component';
import { PermitActivityReportComponent } from './permit/permit-activity-report/permit-activity-report.component';
import { CheckFacReportComponent } from './check/check-fac-report/check-fac-report.component';
import { CheckEquipReportComponent } from './check/check-equip-report/check-equip-report.component'
import { CheckActivityReportComponent } from './check/check-activity-report/check-activity-report.component';
import{MonitorDailyReportComponent} from './monitor/monitor-daily-report/monitor-daily-report.component';
import{MonitorCheckReportComponent} from './monitor/monitor-check-report/monitor-check-report.component';
import{MonitorWitnessReportComponent} from './monitor/monitor-witness-report/monitor-witness-report.component';
import{SecurityServicedepartReportComponent} from './security/security-servicedepart-report/security-servicedepart-report.component';
import{SecurityFacProblemReportComponent} from './security/security-fac-problem-report/security-fac-problem-report.component';
import{SecurityEquipProblemReportComponent} from './security/security-equip-problem-report/security-equip-problem-report.component';
import{SecurityUmineplaceProblemReportComponent} from './security/security-umineplace-problem-report/security-umineplace-problem-report.component';



import { AccidentReportComponent } from './accident-report/accident-report.component';
import { from } from 'rxjs';


const routes: Routes = [
    {
        path: '',
        component: StatisticsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        LayoutsModule,
        RouterModule.forChild(routes),

    ],
    exports: [RouterModule],
    declarations: [
        StatisticsComponent,
        FacReportComponent,
        UmineplaceReportComponent,
        PermitFacReportComponent,
        PermitEquipReportComponent,
        PermitActivityReportComponent,
        CheckFacReportComponent,
        CheckEquipReportComponent,
        CheckActivityReportComponent,
        MonitorDailyReportComponent,
        MonitorCheckReportComponent,
        MonitorWitnessReportComponent,
        SecurityServicedepartReportComponent,
        SecurityFacProblemReportComponent,
        SecurityEquipProblemReportComponent,
        SecurityUmineplaceProblemReportComponent,
        AccidentReportComponent
    ]
})
export class StatisticsModule { }
