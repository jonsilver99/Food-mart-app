import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreFrontComponent } from './components/store-front/store-front.component';
import { RouteAuthGuard } from '../core/services/route-auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutGuard } from './services/check-out.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';

const StoreFrontRoutes: Routes = [
    { path: 'front', component: StoreFrontComponent, canActivate: [RouteAuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [RouteAuthGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [CheckOutGuard, RouteAuthGuard] },
    { path: 'purchaseHistory', component: PurchaseHistoryComponent, canActivate: [RouteAuthGuard] },
    // { path: 'myAccount', component: StoreFrontComponent, canActivate: [RouteAuthGuard], canActivateChild: [RouteAuthGuard], children: [] },
    { path: '', redirectTo: 'front', pathMatch: 'full' },
    { path: '**', redirectTo: 'front', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forChild(StoreFrontRoutes),
    ],
    exports: [
        RouterModule // by exporting routermodule from here - I dont need to import it in my app.module
    ],
    declarations: []
})


export class StoreRoutingModule { }
