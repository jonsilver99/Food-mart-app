import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProductsService } from '../../../shared/services/products.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../models/interfaces';
import { OrderService } from '../../../store/services/order.service';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    public UserName: string;
    public View: 'Sales' | 'StockManagement' | 'AddProduct' = 'Sales'
    public StockProducts$: Observable<Product[]>;
    public SalesData$: Observable<any>;

    constructor(
        private AuthService: AuthService,
        private ProductService: ProductsService,
        private OrderService: OrderService,
        private Store: Store,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.UserName = this.AuthService.User.FirstName
        this.ProductService.getStockProducts('allProducts').subscribe()
        this.OrderService.getOrdersByDates().subscribe()

        this.StockProducts$ = this.Store.select(['StockProducts'])
            .filter(Boolean)

        this.SalesData$ = this.Store.select(['SalesData'])
            .filter(Boolean)

    }

    signOut($event) {
        event.stopPropagation();
        this.AuthService.signOut();
    }

    onActionSelected(actionName: 'trendGraph' | 'allProducts' | 'topSellers' | 'lowOnStock' | 'addProduct') {
        if (['trendGraph'].includes(actionName)) {
            this.View = 'Sales'
        }
        if (['allProducts', 'topSellers', 'lowOnStock'].includes(actionName)) {
            this.View = 'StockManagement'
            this.ProductService.getStockProducts(actionName).subscribe()
        }
        if (['addProduct'].includes(actionName)) {
            this.View = 'AddProduct'
        }
    }

    onTrendGraphDateSelected(date) {
        this.OrderService.getOrdersByDates(date).subscribe()
    }

}