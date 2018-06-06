import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Cart, CartItem, Order, ClientNotification } from '../../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';
import { CustomFormValidatorsService } from '../../../shared/services/custom-form-validators.service';
import { Router } from '@angular/router';
import { DeliveryDates } from '../../../../models/custome_types';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css', '../store-front/store-front.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    // cart
    public Cart$: Observable<Cart>

    // order form 
    public OrderForm: FormGroup;
    public ShippingAndHandling: number = 10;
    // public IsPending: boolean = false;

    constructor(
        private Store: Store,
        private OrderService: OrderService,
        private FB: FormBuilder,
        private CustomValidators: CustomFormValidatorsService,
        private AuthService: AuthService,
        private Router: Router,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.Cart$ = this.Store.select(["ActiveCart"])
            .distinctUntilChanged()
            .share()
            .do((cart: Cart) => {
                if (cart) {
                    this.initOrderForm(cart)
                }
            })
    }

    initOrderForm(cart: Cart) {
        const user = this.AuthService.User
        this.OrderForm = this.FB.group({
            User_id: [user._id, Validators.required],
            Cart_id: [cart._id, Validators.required],
            DeliveryDate: [null, Validators.required],
            SubTotal: [this.calcTotal(cart.ItemsInCart), Validators.required],
            ShippingAndHandling: [this.ShippingAndHandling, Validators.required],
            GrandTotal: [this.calcTotal(cart.ItemsInCart, true), Validators.required],

            ShippingDetails: this.FB.group({
                FirstName: [user.FirstName, Validators.required],
                LastName: [user.LastName, Validators.required],
                Phone: [user.Phone, Validators.required],
                City: [user.City, Validators.required],
                Street: [user.Street, [Validators.required, this.CustomValidators.checkForNums]],
            }),
            Payment: this.FB.group({
                Type: ['', Validators.required],
                CardBrand: [''],
                CardNumber: [null],
                CredentialEmail: ['', Validators.email],
                CredentialPassword: [''],
            })
        })
        this.getDeliveryDates();
    }

    calcTotal(cartItems: CartItem[], plusShipping?: boolean) {
        let total = 0;
        cartItems.forEach((item: CartItem) => {
            total += item.Product.UnitPrice * item.Qty
        })
        if (plusShipping) total += this.ShippingAndHandling;
        return total
    }

    get subTotal() {
        return this.OrderForm.get('SubTotal').value

    }

    get grandTotal() {
        return this.OrderForm.get('GrandTotal').value
    }

    onOrderPlaced(order: Order) {
        this.OrderService.placeOrder(order)
            .subscribe((successMsg: any) => {
                this.NotificationsService.notifyClient({
                    Type: 'success',
                    Message: "Thank you for your purchase! You'll be redirected back to the store shortly...",
                    Title: successMsg,
                    Timeout: 7000,
                    Dismissable: false
                })
                setTimeout(() => {
                    this.Router.navigateByUrl('/')
                    window.location.reload()
                }, 6000);
            })
    }

    getDeliveryDates() {
        this.OrderService.getDeliveryDates()
            .subscribe(
            (deliverydates: DeliveryDates) => {
                this.OrderForm.get('DeliveryDate').setValidators([
                    Validators.required,
                    this.CustomValidators.checkValidDeliveryDate(deliverydates.unavailable)
                ])
                this.OrderForm.patchValue({ 'DeliveryDate': deliverydates.earliestAvailable })
            })
    }

    ngOnDestroy() {
        this.Store.set('ValidCheckout', null)
    }

}