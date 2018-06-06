import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuthGuard } from '../core/services/route-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const AdminRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [RouteAuthGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AdminRoutingModule { }
