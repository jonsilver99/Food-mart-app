import { Component, OnInit, Input } from '@angular/core';
import { ClientNotification } from '../../../../models/interfaces';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    @Input() public Notification: ClientNotification;

    constructor(
        private Store: Store,
    ) { }

    ngOnInit() {
        if (this.Notification.Timeout) {
            setTimeout(() => {
                this.dismiss()
            }, this.Notification.Timeout);
        }
    }

    get notificationType() {
        return this.Notification.Type;
    }

    dismiss(event?, notificationBox?) {
        if (this.Notification.Dismissable === false) return

        if (!event) {
            return this.Store.set('ClientNotification', null)
        }
        if (event && !notificationBox.contains(event.target)) {
            return this.Store.set('ClientNotification', null)
        }
        return
    }
}