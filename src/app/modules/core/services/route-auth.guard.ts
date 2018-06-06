import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from './notifications.service';
import { ApiResponse } from '../../../models/interfaces';

@Injectable()
export class RouteAuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private NotificationsService: NotificationsService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let requestedRoute = route.routeConfig.path;
        if (['actions', 'signin', 'signup'].includes(requestedRoute)) {
            if (this.AuthService.AuthState.IsSignedIn) {
                this.NotificationsService.notifyClient({
                    Type: 'alert',
                    Message: `${requestedRoute} - Auth routes blocked while signed-in`,
                    Timeout: 4000
                })
                return false;
            } else {
                return true;
            }
        } else {
            // if requested requires a signedIn state - verify that auth token is valid and not expired 
            if (this.AuthService.AuthState.IsSignedIn && this.AuthService.AuthState.Token) {
                return this.AuthService.verifyToken()
                    .map((verification: ApiResponse) => {
                        if (verification.success && verification.message == 'verified') {
                            return true;
                        } else {
                            alert('Auth token not verified as expected - app will sign out')
                            this.AuthService.signOut();
                            return false;
                        }
                    })
                    .first()
                    .catch((err: HttpErrorResponse): Observable<any> => {
                        return Observable.of(false);
                    });
            } else {
                this.NotificationsService.notifyClient({
                    Type: 'alert',
                    Message: "Route Restricted - please sign in first",
                    Timeout: 4000
                })
                return false;
            }
        }
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

}