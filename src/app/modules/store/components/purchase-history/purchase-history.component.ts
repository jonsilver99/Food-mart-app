import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../../../models/interfaces';
import { UserActivityService } from '../../services/user-activity.service';

@Component({
    selector: 'app-purchase-history',
    templateUrl: './purchase-history.component.html',
    styleUrls: ['./purchase-history.component.css', '../store-front/store-front.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

    public PurchaseHistory$: Observable<Order[]>

    constructor(private UserActivityService: UserActivityService) { }

    ngOnInit() {
        this.PurchaseHistory$ = this.UserActivityService.fetchPurchaseHistory()
    }



}
