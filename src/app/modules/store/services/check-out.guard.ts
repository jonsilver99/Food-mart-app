import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../../models/interfaces';
import { NotificationsService } from '../../core/services/notifications.service';
import { Store } from '../../../app-store/store';

@Injectable()
export class CheckOutGuard implements CanActivate {

    constructor(
        private Router: Router,
        private Store: Store,
        private NotificationsService: NotificationsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.Store.select(['ValidCheckout'])
            .map((ValidCheckout: boolean) => {
                if (!ValidCheckout) throw "Please checkout only through the cart's checkout button"
                else return true
            })
            .first()
            .catch((err: any): Observable<any> => {
                this.NotificationsService.notifyClient({ Type: 'alert', Message: err })
                return Observable.of(false);
            });
    }
}