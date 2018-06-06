import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { CartItem } from '../../../../../models/interfaces';
import { Store } from '../../../../../app-store/store';

@Component({
    selector: 'app-store-header',
    templateUrl: './store-header.component.html',
    styleUrls: ['./store-header.component.css', '../store-front.component.css']
})
export class StoreHeaderComponent implements OnInit {

    public CartIndicator$: Observable<CartItem[] | any>
    public UserName: string

    constructor(
        private AuthService: AuthService,
        private Store: Store
    ) { }

    ngOnInit() {
        this.CartIndicator$ = this.Store.select(['ActiveCart', 'ItemsInCart'])
            .distinctUntilChanged()
            .share()
        this.UserName = this.AuthService.User.FirstName
    }

    signOut(event) {
        event.stopPropagation();
        this.AuthService.signOut();
    }



}
