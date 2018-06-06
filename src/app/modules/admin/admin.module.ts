import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardAsideComponent } from './components/dashboard/dashboard-aside/dashboard-aside.component';
import { StockManageTableComponent } from './components/dashboard/stock-manage-table/stock-manage-table.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { AddProductComponent } from './components/dashboard/add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [DashboardComponent, DashboardAsideComponent, StockManageTableComponent, SalesComponent, AddProductComponent]
})
export class AdminModule { }