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
    UmineSearchShowComponent, UmineAddComponent,SecurityUmineplaceComponent
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
    UmineSearchShowComponent, UmineAddComponent,SecurityUmineplaceComponent
  ]
})
export class LayoutsModule { }
