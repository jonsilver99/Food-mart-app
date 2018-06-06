import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { ErrorsHandlerService } from './errors-handler.service';
import { NotificationsService } from './notifications.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

    constructor(
        private AuthService: AuthService,
        private ErrorsHandlerService: ErrorsHandlerService,
        private NotificationsService: NotificationsService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.interceptionIsNeeded(req.url)) {
            req = req.clone({
                setHeaders: {
                    authorization: this.AuthService.AuthState.Token
                },
            })
        }

        return next.handle(req)
            // .do((response: any) => {
            //     if (response instanceof HttpResponse) {}
            // })
            .catch((err: HttpErrorResponse | any) => {
                this.ErrorsHandlerService.handleError(err)
                err.handled = true;
                return Observable.throw(err);
            });
    }


    interceptionIsNeeded(url: string) {

        if (url.includes(`${environment.BaseServerUrl}/api`)) {
            return true
        } else {
            return false
        }
    }

}
