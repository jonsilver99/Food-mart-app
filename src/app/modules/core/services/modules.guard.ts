import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { CanLoadResolve } from '../../../models/custome_types';


@Injectable()
export class ModulesGuard implements CanLoad {

    constructor(private AuthService: AuthService, private Router: Router) { }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        let resolve: CanLoadResolve;
        switch (route.path) {
            case 'auth': {
                resolve = this.canLoadAuthModule();
                break;
            }
            case 'store': {
                resolve = this.canLoadStoreModule();
                break;
            }
            case 'admin': {
                resolve = this.canLoadAdminModule();
                break;
            }
        }
        if (!resolve) throw ('Something went wrong in modules.guard canLoad function - route or user role not recognized')
        else if (resolve.canload) return true
        else this.Router.navigate([resolve.redirectPath]);
        return false
    }

    canLoadAuthModule(): CanLoadResolve {
        if (this.getSignedUser() === false) {
            return { canload: true }
        }

        else if (this.getSignedUser() == 'customer') {
            return { canload: false, redirectPath: '/store' }
        }

        else if (this.getSignedUser() == 'admin') {
            return { canload: false, redirectPath: '/admin' }
        }
    }

    canLoadStoreModule(): CanLoadResolve {
        if (this.getSignedUser() == 'customer') {
            return { canload: true }
        } else {
            return { canload: false, redirectPath: '/auth' }
        }
    }

    canLoadAdminModule(): CanLoadResolve {
        if (this.getSignedUser() == 'admin') {
            return { canload: true }
        } else {
            return { canload: false, redirectPath: '/admin' }
        }
    }

    getSignedUser(): string | boolean {
        let signedState = this.AuthService.AuthState;
        return (signedState.IsSignedIn) ? signedState.User.Role : false;
    }
}