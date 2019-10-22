import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { HandleHttpInterceptor } from './utilities/interceptors/handlehttp.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CustomReuseStrategy } from './utilities/custom-reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';

/** 配置 angular i18n **/
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutsModule,
    HttpModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HandleHttpInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
