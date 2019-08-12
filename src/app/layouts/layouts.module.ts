import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

import { ShareModule } from '../common-modules/share/share.module';
import { ValidationDirective } from './_directives/validation.directive';
import { SexPipe } from './_pipes/sex.pipe';
import { RecordtimePipe } from './_pipes/recordtime.pipe';
import { IsTruePipe } from './_pipes/istrue.pipe';
import { TooltipsPipe } from './_pipes/tooltips.pipe';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { ServicedepartComponent } from './../../app/business-modules//components/unit/servicedepart/servicedepart.component';
import { ActivityPermitComponent } from './../../app/business-modules/components/permit/activity/activity.component';
import { GroupComponent } from './../../app/business-modules/components/unit/group/group.component';
import { UmineComponent } from './../../app/business-modules/components/unit/umine/umine.component';
import { EquipdepartComponent } from './../../app/business-modules/components/unit/equipdepart/equipdepart.component';
import { FacComponent } from './../../app/business-modules/components/unit/fac/fac.component';
import { UmineplaceComponent } from './../../app/business-modules/components/unit/umineplace/umineplace.component';
import { UminemountainComponent } from './../../app/business-modules/components/unit/uminemountain/uminemountain.component';
import { GroupAddComponent } from './../../app/business-modules/components/unit/group/group-add/group-add.component';
import { ServicedepartAddComponent } from './../../app/business-modules/components/unit/servicedepart/servicedepart-add/servicedepart-add.component';
import { ServicedepartSearchShowComponent } from './../../app/business-modules/components/unit/servicedepart/servicedepart-search-show/servicedepart-search-show.component';
import { ServicedepartReportmanageComponent } from './../../app/business-modules/components/unit/servicedepart/servicedepart-reportmanage/servicedepart-reportmanage.component';
import { ActivityComponent } from './../../app/business-modules/components/check/activity/activity.component';
import { DailyComponent } from './../../app/business-modules/components/monitor/daily/daily.component';
import { CheckComponent } from './../../app/business-modules/components/monitor/check/check.component';
import { WitnessComponent } from './../../app/business-modules/components/monitor/witness/witness.component';
import { SecurityFacComponent } from './../../app/business-modules/components/security/fac/fac.component';
import { AccidentComponent } from './../../app/business-modules/components/security/accident/accident.component';

import { UmineSearchShowComponent } from './../../app/business-modules/components/unit/umine/umine-search-show/umine-search-show.component';
import { UmineAddComponent } from './../../app/business-modules/components/unit/umine/umine-add/umine-add.component';

import { SecurityUmineplaceComponent } from './../../app/business-modules/components/security/umineplace/umineplace.component';

import { EquipdepartSearchShowComponent } from './../../app/business-modules/components/unit/equipdepart/equipdepart-search-show/equipdepart-search-show.component';
import { EquipdepartAddComponent } from './../../app/business-modules/components/unit/equipdepart/equipdepart-add/equipdepart-add.component';
import { EquipPermitComponent } from './../../app/business-modules/components/permit/equip/equip.component';

import { EquipComponent } from './../../app/business-modules/components/check/equip/equip.component';
import { SecurityEquipComponent } from './../../app/business-modules/components/security/equip/equip.component';

import { FacSearchShowComponent } from './../../app/business-modules/components/unit/fac/fac-search-show/fac-search-show.component';
import { FacAddComponent } from './../../app/business-modules/components/unit/fac/fac-add/fac-add.component';
import { FacImproveComponent } from './../../app/business-modules/components/unit/fac/fac-improve/fac-improve.component';
import { FacReportComponent } from './../../app/business-modules/components/unit/fac/fac-report/fac-report.component';

import { PermitFacComponent } from './../../app/business-modules/components/permit/fac/fac.component';
import { CheckFacComponent } from './../../app/business-modules/components/check/fac/fac.component';

import { UmineplaceSearchShowComponent } from './../../app/business-modules/components/unit/umineplace/umineplace-search-show/umineplace-search-show.component';
import { UmineplaceAddComponent } from './../../app/business-modules/components/unit/umineplace/umineplace-add/umineplace-add.component';
import { UmineplaceChildmanageComponent } from './../../app/business-modules/components/unit/umineplace/umineplace-childmanage/umineplace-childmanage.component';
import { UmineplacePermitComponent } from './../../app/business-modules/components/permit/umineplace/umineplace.component';
import { CheckUmineplaceComponent } from './../../app/business-modules/components/check/umineplace/umineplace.component';

import { UminemountainSearchShowComponent } from './../../app/business-modules/components/unit/uminemountain/uminemountain-search-show/uminemountain-search-show.component';
import { UminemountainAddComponent } from './../../app/business-modules/components/unit/uminemountain/uminemountain-add/uminemountain-add.component';
import { UminemountainChildmanageComponent } from './../../app/business-modules/components/unit/uminemountain/uminemountain-childmanage/uminemountain-childmanage.component';

import { UminemountainPermitComponent } from './../../app/business-modules/components/permit/uminemountain/uminemountain.component';
import { CheckUminemountainComponent } from './../../app/business-modules/components/check/uminemountain/uminemountain.component';
import { ActivityPermitAddComponent } from './../../app/business-modules/components/permit/activity/activity-add/activity-add.component';

import { ActivityAddComponent } from './../../app/business-modules/components/check/activity/activity-add/activity-add.component';
import { ActivityFileComponent } from './../../app/business-modules/components/check/activity/activity-file/activity-file.component';
import { DailyAddComponent } from './../../app/business-modules/components/monitor/daily/daily-add/daily-add.component';
import { CheckAddComponent } from './../../app/business-modules/components/monitor/check/check-add/check-add.component';
import { WitnessAddComponent } from './../../app/business-modules/components/monitor/witness/witness-add/witness-add.component';

import { SecurityFacAddComponent } from './../../app/business-modules/components/security/fac/fac-add/fac-add.component';
import { AccidentAddComponent } from './../../app/business-modules/components/security/accident/accident-add/accident-add.component';
import { SecurityUmineplaceAddComponent } from './../../app/business-modules/components/security/umineplace/umineplace-add/umineplace-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgZorroAntdModule,
    ShareModule
  ],
  declarations: [
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    NavMenuComponent,
    SexPipe,
    RecordtimePipe,
    TooltipsPipe,
    IsTruePipe,
    ValidationDirective,
    AttachmentComponent,
    ServicedepartComponent,
    ActivityPermitComponent,
    GroupComponent,
    UmineComponent,
    EquipdepartComponent,
    FacComponent,
    UmineplaceComponent,
    UminemountainComponent,
    GroupAddComponent,
    ServicedepartAddComponent,
    ServicedepartSearchShowComponent,
    ServicedepartReportmanageComponent,
    ActivityComponent,
    DailyComponent, CheckComponent, WitnessComponent,
    SecurityFacComponent, AccidentComponent,
    UmineSearchShowComponent, UmineAddComponent, SecurityUmineplaceComponent,
    EquipdepartSearchShowComponent, EquipdepartAddComponent,
    EquipPermitComponent, EquipComponent, SecurityEquipComponent,
    FacSearchShowComponent, FacAddComponent, FacImproveComponent,
    FacReportComponent, PermitFacComponent, CheckFacComponent,
    UmineplaceSearchShowComponent, UmineplaceAddComponent, UmineplacePermitComponent,
    CheckUmineplaceComponent, UmineplaceChildmanageComponent,
    UminemountainSearchShowComponent, UminemountainAddComponent,
    UminemountainChildmanageComponent, UminemountainPermitComponent, CheckUminemountainComponent,
    ActivityPermitAddComponent, ActivityAddComponent, ActivityFileComponent,
    DailyAddComponent, CheckAddComponent, WitnessAddComponent, SecurityFacAddComponent, AccidentAddComponent,
    SecurityUmineplaceAddComponent
  ],
  exports: [
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    NavMenuComponent,
    SexPipe,
    RecordtimePipe,
    IsTruePipe,
    TooltipsPipe,
    ValidationDirective,
    AttachmentComponent,
    ServicedepartComponent,
    ActivityPermitComponent,
    GroupComponent,
    UmineComponent,
    EquipdepartComponent,
    FacComponent,
    UmineplaceComponent,
    UminemountainComponent,
    GroupAddComponent,
    ServicedepartAddComponent,
    ServicedepartSearchShowComponent,
    ServicedepartReportmanageComponent,
    ActivityComponent,
    DailyComponent, CheckComponent, WitnessComponent,
    SecurityFacComponent, AccidentComponent,
    UmineSearchShowComponent, UmineAddComponent, SecurityUmineplaceComponent,
    EquipdepartSearchShowComponent, EquipdepartAddComponent,
    EquipPermitComponent, EquipComponent, SecurityEquipComponent,
    FacSearchShowComponent, FacAddComponent, FacImproveComponent,
    FacReportComponent, PermitFacComponent, CheckFacComponent,
    UmineplaceSearchShowComponent, UmineplaceAddComponent, UmineplacePermitComponent,
    CheckUmineplaceComponent, UmineplaceChildmanageComponent,
    UminemountainSearchShowComponent, UminemountainAddComponent,
    UminemountainChildmanageComponent, UminemountainPermitComponent, CheckUminemountainComponent,
    ActivityPermitAddComponent, ActivityAddComponent, ActivityFileComponent,
    DailyAddComponent, CheckAddComponent, WitnessAddComponent, SecurityFacAddComponent, AccidentAddComponent,
    SecurityUmineplaceAddComponent
  ]
})
export class LayoutsModule { }
