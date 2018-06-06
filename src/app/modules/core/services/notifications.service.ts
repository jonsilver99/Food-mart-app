import { Injectable } from '@angular/core';
import { Store } from '../../../app-store/store';
import { ClientNotification } from '../../../models/interfaces';


@Injectable()
export class NotificationsService {

    constructor(
        private Store: Store
    ) { }

    notifyClient(data: ClientNotification) {
        const notification = this.createNotification(
            data.Type,
            data.Message,
            data.Title,
            data.dismissButton,
            data.Timeout,
            data.Dismissable
        )
        this.Store.set('ClientNotification', notification)
    }

    createNotification(
        type: "success" | "error" | "alert",
        message: string,
        title?: string,
        dismissButton?: string,
        timeout?: number,
        dismissable?: boolean
    ): ClientNotification {
        return {
            Type: type,
            Message: message,
            Title: title,
            dismissButton: dismissButton,
            Timeout: timeout,
            Dismissable: dismissable
        }
    }

}
