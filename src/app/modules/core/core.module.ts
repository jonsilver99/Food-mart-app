import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/Rx'; // import all Rx instead of individual operators - since I use alot of operators

import { ModulesGuard } from './services/modules.guard';
import { RouteAuthGuard } from './services/route-auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { MainInterceptor } from './services/main-interceptor.service';
import { CacheInterceptor } from './services/cache-interceptor.service';
import { CacheStoreService } from './services/cache-store.service';
import { ErrorsHandlerService } from './services/errors-handler.service';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';

@NgModule({
    imports: [HttpClientModule, CommonModule],
    declarations: [NotificationsComponent],
    exports: [NotificationsComponent],        
    providers: [
        RouteAuthGuard,
        ModulesGuard,
        AuthService,
        CacheStoreService,
        ErrorsHandlerService,
        NotificationsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MainInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true
        },
    ],
})
export class CoreModule { }
