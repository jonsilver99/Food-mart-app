import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { Order, Cart, ApiResponse } from '../../../models/interfaces';
import { DeliveryDates } from '../../../models/custome_types';
import { Store } from '../../../app-store/store';

@Injectable()
export class OrderService {

    constructor(
        private AuthService: AuthService,
        private HttpReqs: HttpClient,
        private Store: Store,
    ) { }

    placeOrder(order: Order) {
        return this.HttpReqs.post(environment.OrdersUrl, order)
            .map((result: ApiResponse) => result.message)
    }

    getDeliveryDates() {
        return this.HttpReqs.get(`${environment.OrdersUrl}/deliverydates/all`, { params: { dontCache: 'true' } })
            .map((result: ApiResponse) => {
                let deliveryDates: DeliveryDates = result.data
                return deliveryDates
            })
    }

    getOrdersByDates(startDate?: any) {
        let params = { startDate: startDate || '' }
        return this.HttpReqs.get(`${environment.OrdersUrl}/bydates`, { params: params })
            .map((result: ApiResponse) => {
                let ordersByDates = result.data
                return ordersByDates
            })
            .do((result: any) => {
                this.Store.set('SalesData', result)
            })
    }
}