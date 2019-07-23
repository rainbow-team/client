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
import { RecordtimePipe } from './_pipes/recordtime.pipe';
import { IsTruePipe } from './_pipes/istrue.pipe';
import { TooltipsPipe } from './_pipes/tooltips.pipe';
import { AttachmentComponent } from './components/attachment/attachment.component';

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
    RecordtimePipe,
    TooltipsPipe,
    IsTruePipe,
    ValidationDirective,
    AttachmentComponent
  ],
  exports: [
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    NavMenuComponent,
    RecordtimePipe,
    IsTruePipe,
    TooltipsPipe,
    ValidationDirective,
    AttachmentComponent
  ]
})
export class LayoutsModule { }
