import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem, Cart } from '../../../../models/interfaces';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CustomFormValidatorsService } from '../../../shared/services/custom-form-validators.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css', '../store-front/store-front.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    public Cart$: Observable<Cart>
    // cart items updates action
    public CartForm: FormGroup;
    public CartItemChanges: Subscription;
    public IsPending: boolean = false;
    public CartItemSearch: CartItem[] = [];

    constructor(
        private CartService: CartService,
        private Store: Store,
        private FB: FormBuilder,
        private CustomValidators: CustomFormValidatorsService,
        private Router: Router,
        private NotificationsService: NotificationsService,
    ) { }

    ngOnInit() {
        this.Cart$ = this.Store.select(["ActiveCart"])
            .distinctUntilChanged()
            .share()
            .do((cart: Cart) => {
                if (cart) {
                    this.initCartForm(cart)
                    this.subscribeToCartItemChanges(cart)
                }
            })
    }

    initCartForm(cart: Cart) {
        // wrap current cart state in a reactive form - with validators on each item inside the cart
        let reactiveCartItems: FormGroup[] = cart.ItemsInCart.map(item => {
            return this.createReactiveCartItem(item)
        })
        this.CartForm = this.FB.group({
            _id: [cart._id, [Validators.required]],
            User_id: [cart.User_id, [Validators.required]],
            DateCreated: [cart.DateCreated, [Validators.required]],
            DateClosed: [cart.DateClosed, []],
            ItemsInCart: this.FB.array(reactiveCartItems)
        }, { validator: this.CustomValidators.checkCartIsNotEmpty })
    }

    subscribeToCartItemChanges(cart: Cart) {

        // on cart-items Value change (coming up from sub components) update cart items in server
        this.CartItemChanges = this.CartForm.get('ItemsInCart').valueChanges
            .do(() => this.IsPending = true)
            .debounceTime(500)
            .distinctUntilChanged()
            .map((newValue: CartItem[]) => {

                // transform to send just the _id and quantity instead of whole product object
                let updatedItems = newValue.map(item => {
                    return { Product: item.Product._id, Qty: item.Qty }
                })
                return { cart_id: cart._id, updatedItems: updatedItems }
            })
            .switchMap(updateData => {
                return this.CartService.updateCartItems(updateData.cart_id, updateData.updatedItems)
            })
            .subscribe(
            result => {
                this.IsPending = false
                console.log(result)
            },
            err => {
                this.IsPending = false
                console.log(err)
            }
            )
    }

    createReactiveCartItem(cartItem: CartItem): FormGroup {
        const reactiveCartItem = this.FB.group({
            Product: [cartItem.Product, [Validators.required]],
            Qty: [cartItem.Qty, [Validators.required, Validators.min(1), Validators.max(cartItem.Product.UnitsInStock)]],
        })
        return reactiveCartItem;
    }

    get reactiveCartItems() {
        return (this.CartForm.get('ItemsInCart') as FormArray).controls
    }

    get subTotal() {
        let cartItem: CartItem | any;
        let total = 0;
        this.reactiveCartItems.forEach(item => {
            cartItem = item.value
            total += (cartItem.Product.UnitPrice * cartItem.Qty)
        })
        return total
    }

    onRemoveCartItem(reactiveCartItem: FormGroup, index: number) {
        (this.CartForm.get('ItemsInCart') as FormArray).removeAt(index)
    }

    onCheckout() {
        // if cart items update is in progress - abort
        if (this.IsPending) return
        this.IsPending = true

        // before check out
        let cid = this.CartForm.get('_id').value;
        this.CartService.refreshCartItems(cid)
            .subscribe(
            (result) => {
                this.IsPending = false
                if (this.CartForm.invalid) {
                    return this.NotificationsService.notifyClient({
                        Type: 'alert', Message: 'Invalid form inputs', Timeout: 4000
                    })
                }
                this.Store.set('ValidCheckout', true)
                this.Router.navigate(['/store/checkout'])
            },
            err => this.IsPending = false)
    }

    ngOnDestroy() {
        this.CartItemChanges.unsubscribe();
    }
}