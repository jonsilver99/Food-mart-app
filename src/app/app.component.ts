import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientNotification } from './models/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { Store } from './app-store/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    // title
    public title = 'Food-Mart';

    // client notifications
    public ClientNotification$: Observable<ClientNotification>;
    public TimeOut: number;
    public dismissButton: boolean;

    constructor(
        private AuthService: AuthService,
        private Store: Store
    ) { }

    ngOnInit() {

        this.AuthService.checkIfPreviousSessionExists();

        this.ClientNotification$ = this.Store.select(['ClientNotification'])

    }


}