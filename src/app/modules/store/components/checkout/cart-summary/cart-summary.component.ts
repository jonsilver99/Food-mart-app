import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../../../../models/interfaces';

@Component({
    selector: 'app-cart-summary',
    templateUrl: './cart-summary.component.html',
    styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

    @Input() public Cart: Cart
    @Input() public SubTotal: number
    @Input() public ShippingAndHandling: number
    @Input() public GrandTotal: number

    // proxy images - config. boolean to pass down to the nested product row component
    @Input() public ProxyImages: boolean = false;

    constructor() { }

    ngOnInit() { }

}
