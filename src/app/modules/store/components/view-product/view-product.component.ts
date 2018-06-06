import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Product, CartItem, Cart } from '../../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { UserActivityService } from '../../services/user-activity.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { NotificationsService } from '../../../core/services/notifications.service';
import { IdToCategoryMap } from '../../../../models/dictionary';
import { Category } from '../../../../models/custome_types';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-view-product',
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

    // viewing product
    public Viewing$: Observable<Product | any>
    // related product
    public Related$: Observable<Product | any>

    public S3FolderPath: string = environment.S3FolderPath

    // add to cart action
    private ActiveCartRef: Subscription;
    private Cart_id: String;
    public AddToCartForm: FormGroup;
    public RequestStatus: 'initial' | 'pending' | 'success' = 'initial';
    public IsPending: boolean = false;

    constructor(
        private UserActivityService: UserActivityService,
        private CartService: CartService,
        private Store: Store,
        private FB: FormBuilder,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.ActiveCartRef = this.Store.select(["ActiveCart"])
            .filter(Boolean)
            .distinctUntilChanged()
            .map((ActiveCart: Cart) => ActiveCart._id)
            .subscribe((_id: string) => this.Cart_id = _id)

        this.Viewing$ = this.Store.select(["ViewingProduct"])
            .distinctUntilChanged()
            .share()
            .do((prod: Product) => {
                if (prod) {
                    this.UserActivityService.updateRecentlyViewed(prod._id)
                    this.initForm(prod)
                    this.getRelatedProducts(prod)
                }
            })
    }

    getRelatedProducts(product: Product) {
        let categoryName = IdToCategoryMap[product.Category]
        return this.Related$ = this.Store.select(['FeaturedProducts'])
            .map((categories: Category[]) => {
                let related: Product[];
                for (let cat of categories) {
                    if (cat.Name == categoryName) related = cat.Products
                }
                return related
            })
            .distinctUntilChanged()
            .share()
    }

    initForm(prod: Product) {
        this.AddToCartForm = this.FB.group({
            Product: [prod, [Validators.required]],
            Qty: [1, [Validators.required, Validators.min(1), Validators.max(prod.UnitsInStock)]],
        })
    }

    addToWishList(prod: Product) {
        console.log(prod)
    }

    addToCart() {
        // if add to cart request already in process - abort
        if (this.IsPending) return
        if (this.AddToCartForm.invalid) {
            return this.NotificationsService.notifyClient({
                Type: 'alert', Message: 'Invalid form inputs', Timeout: 4000
            })
        }
        this.IsPending = true;
        this.RequestStatus = 'pending'

        let newCartItem: CartItem = {
            Product: this.AddToCartForm.get('Product').value._id,
            Qty: this.AddToCartForm.get('Qty').value
        }

        this.CartService.addToCart(this.Cart_id, newCartItem)
            .subscribe(successMsg => {
                this.RequestStatus = 'success'
                setTimeout(() => {
                    this.RequestStatus = 'initial';
                    this.IsPending = false;
                }, 3000);
            },
            err => {
                console.log(err)
                this.RequestStatus = 'initial';
                this.IsPending = false;
            })
    }

    closePopUp() {
        this.Store.set('ViewingProduct', null);
    }

    stopClickPropagation(event?: Event) {
        event.stopPropagation();
    }

    ngOnDestroy() {
        this.ActiveCartRef.unsubscribe()
    }
}