import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../components/template/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../../components/template/page-not-found/page-not-found.component';
import { LoginComponent } from '../../components/template/login/login.component';
import { AuthGuard } from '../../guard/Auth.guard';
import { AntiAuthGuard } from '../../guard/AntiAuth.guard';
import { DashboardNewComponent } from '../../components/template/dashboard-new/dashboard-new.component';
import { DashboardModel1Component } from '../../components/template/dashboard-model1/dashboard-model1.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-model1', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-new', component: DashboardNewComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-model1', component: DashboardModel1Component, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AntiAuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class RoutingModule { }
