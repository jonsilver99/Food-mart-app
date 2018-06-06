import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CacheStoreService } from './cache-store.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private CacheStore: CacheStoreService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.interceptionIsNeeded(req)) return next.handle(req);
        const cachedResponse = this.CacheStore.get(req.urlWithParams)

        if (cachedResponse) {
            return Observable.of(cachedResponse);
        } else {
            return this.sendRequest(req, next);
        }
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    this.CacheStore.set(req.urlWithParams, event);
                }
            });
    }

    interceptionIsNeeded(req: HttpRequest<any>) {
        if (req.method == 'GET' && !req.params.get('dontCache')) {
            return true
        } else {
            return false
        }
    }

}