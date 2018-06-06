import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse, UserActivity, Product } from '../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { FormArray } from '@angular/forms';
import { Store } from '../../../app-store/store';

@Injectable()
export class UserActivityService {

    constructor(
        private AuthService: AuthService,
        private HttpReqs: HttpClient,
        private Store: Store
    ) { }

    fetchUserActivity() {
        let uid = this.AuthService.User._id;
        return this.HttpReqs.get(`${environment.UserActivityUrl}/${uid}`)
            .map((results: ApiResponse) => results.data)
            .do((userActivity: UserActivity) => this.Store.set('UserActivity', userActivity))
    }

    fetchPurchaseHistory() {
        let uid = this.AuthService.User._id;
        return this.HttpReqs.get(`${environment.OrdersUrl}/${uid}/ordersHistory`, { params: { dontCache: 'true' } })
            .map((results: ApiResponse) => results.data)
    }

    updateRecentlyViewed(productId) {
        let uid = this.AuthService.User._id;
        this.HttpReqs.put(`${environment.UserActivityUrl}/${uid}/RecentlyViewd`, { productId: productId })
            .map((result: ApiResponse) => result.data)
            .catch(err => Observable.throw(err))
            .filter(Boolean)
            .subscribe(
            (updated: any) => this.Store.setDeep('UserActivity', 'RecentlyViewd', updated))
    }

    updateWishList(productId) {
        let uid = this.AuthService.User._id;
        this.HttpReqs.put(`${environment.UserActivityUrl}/${uid}/WishList`, { productId: productId })
            .map((result: ApiResponse) => result.data)
            .subscribe(
            (updated: any) => this.Store.setDeep('UserActivity', 'WishList', updated))
    }

    updateLastLogin() {
        let uid = this.AuthService.User._id;
        return this.HttpReqs.put(`${environment.UserActivityUrl}/${uid}/LastLogin`, { date: Date.now() })
            .map((result: ApiResponse) => result.data)
    }
}