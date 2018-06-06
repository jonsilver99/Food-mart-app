import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { UserActivityService } from '../../../services/user-activity.service';
import { Store } from '../../../../../app-store/store';

@Component({
    selector: 'app-recently-viewed-products',
    templateUrl: './recently-viewed-products.component.html',
    styleUrls: ['./recently-viewed-products.component.css']
})
export class RecentlyViewedProductsComponent implements OnInit, OnDestroy {

    public RecentleyViewed$: Observable<Product[] | any>;

    constructor(
        private Store: Store,
        private UserActivityService: UserActivityService    
    ) {}

    ngOnInit() {
        this.RecentleyViewed$ = this.Store.select(['UserActivity', 'RecentlyViewd'])
        .distinctUntilChanged()
        .share()
        .do(rv=>{})
    }

    ngOnDestroy() {}

}
