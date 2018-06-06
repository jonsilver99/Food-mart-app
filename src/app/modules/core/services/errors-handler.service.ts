import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientNotification, HandledError } from '../../../models/interfaces';
import { NotificationsService } from './notifications.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class ErrorsHandlerService implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError<T>(error: Error | HttpErrorResponse | any) {

        if (error.handled) return

        // log error
        console.log(error)

        if (error instanceof HttpErrorResponse) {
            // Http errors - server or connection
            if (!navigator.onLine) {
                // Handle offline error
                return this.httpNoConnectionError()
            } else {

                if ('error' in error && 'discriminator' in error.error && error.error.discriminator == 'ApiResponse') {
                    if (error.error.authFailed === true) this.unAuthorized(error)
                    else return this.httpApiError(error)
                }
                else {
                    return this.httpGeneralError(error)
                }
            }
        }
        // Client errors
        else {
            // Handle Client Error (Angular Error, ReferenceError...)     
            return this.clientError(error)
        }
    }

    httpNoConnectionError() {
        const notificationService = this.injector.get(NotificationsService);
        const notification: ClientNotification = { Type: 'error', Message: 'OOpps! No Internet Connection' }
        notificationService.notifyClient(notification)
    }

    httpApiError(error) {
        const notificationService = this.injector.get(NotificationsService);
        const notification: ClientNotification = { Type: 'error', Message: error.error.message }
        if (error.error.errData && 'invalidInput' in error.error.errData) {
            notification.Message += "\nNote: Recieved invalid or illegal input!"
        }
        notificationService.notifyClient(notification)
    }

    httpGeneralError(error) {
        const notificationService = this.injector.get(NotificationsService);
        const notification: ClientNotification = { Type: 'error', Message: `${error.status} - ${error.message}` }
        notificationService.notifyClient(notification)
    }

    unAuthorized(error) {
        const authService = this.injector.get(AuthService);
        alert(error.error.message + ' - app will sign out');
        authService.signOut()
    }

    clientError(error) {
        const notificationService = this.injector.get(NotificationsService);
        const notification: ClientNotification = { Type: 'error', Message: `${error.name} - ${error.message}` }
        notificationService.notifyClient(notification)
    }
}