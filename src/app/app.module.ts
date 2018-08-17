import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guard/Auth.guard';
import { AntiAuthGuard } from './guard/AntiAuth.guard';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MaterialModule } from './modules/MaterialModule/material.module';
import { RoutingModule } from './modules/RouterModule/router.module';
import { CustomInterceptor } from './modules/InterceptorModule/CustomInterceptor.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { DashboardComponent } from './components/template/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/template/page-not-found/page-not-found.component';
import { InputComponent } from './components/form/input/input.component';
import { HeaderMenuComponent } from './components/navigation/header-menu/header-menu.component';
import { SideDrawerComponent } from './components/template/side-drawer/side-drawer.component';
import { LoginComponent } from './components/template/login/login.component';

import { LoginService } from './services/user/login/Login.service';
import { DashboardService } from './services/user/dashboard/Dashboard.service';
import { GlobalErrorHandler } from './services/common/errorHandler/GlobalErrorHandler.service';
import { SideDrawerService } from './services/common/sideDrawer/SideDrawer.service';
import { DashboardNewComponent } from './components/template/dashboard-new/dashboard-new.component';
import { EntityService } from './services/entity/Entity.service';
import { DashboardModel1Component } from './components/template/dashboard-model1/dashboard-model1.component';

export function tokenGetter() {
  return localStorage.getItem('ba-rToken');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    InputComponent,
    HeaderMenuComponent,
    SideDrawerComponent,
    LoginComponent,
    DashboardNewComponent,
    DashboardModel1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    LoginService,
    AuthGuard,
    AntiAuthGuard,
    EntityService,
    DashboardService,
    SideDrawerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },
    [
      GlobalErrorHandler,
      {
        provide: ErrorHandler, useClass: GlobalErrorHandler
      },
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
