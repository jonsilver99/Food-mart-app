import { Injectable } from '@angular/core';
import { Product, ApiResponse, Cart, CartItem } from '../../../models/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../../app-store/store';

@Injectable()
export class CartService {

    constructor(
        private AuthService: AuthService,
        private HttpReqs: HttpClient,
        private Store: Store,
    ) { }

    fetchUserCart() {
        let uid = this.AuthService.User._id;
        return this.HttpReqs.get(`${environment.CartUrl}/${uid}`)
            .map((result: ApiResponse) => result.data)
            .do((cart: Cart) => this.Store.set('ActiveCart', cart))
    }

    addToCart(cart_id: String, newItem: CartItem) {
        return this.HttpReqs.put(`${environment.CartUrl}/${cart_id}/add`, newItem)
            .map((result: ApiResponse) => {
                const updatedItems: CartItem[] = result.data
                this.Store.setDeep('ActiveCart', 'ItemsInCart', updatedItems)
                return 'Item added to cart!'
            })
    }

    // remove cart item quantity or change its quantity
    updateCartItems(cart_id: String, updatedItems: CartItem[] | any[]) {
        return this.HttpReqs.put(`${environment.CartUrl}/${cart_id}/update`, updatedItems)
            .map((result: ApiResponse) => result.data)
            .do((updatedItems: CartItem[]) => {
                this.Store.setDeep('ActiveCart', 'ItemsInCart', updatedItems)
            })
            .map(end => 'Items in cart updated!')
    }

    // reload cart from server - to refresh products price and stock quantity
    refreshCartItems(cart_id: String) {
        return this.HttpReqs.get(`${environment.CartUrl}/${cart_id}/items`, { params: { dontCache: 'true' } })
            .map((result: ApiResponse) => result.data)
            .do((itemsInCart: CartItem[]) => {
                this.Store.setDeep('ActiveCart', 'ItemsInCart', itemsInCart)
            })
            .map(end => 'Items in cart updated!')
    }
}