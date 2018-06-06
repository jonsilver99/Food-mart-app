import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProductsService } from '../../../shared/services/products.service';
import { Product, AuthState, Cart, UserActivity } from '../../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { GalleryBrowseAction, FeaturedProducts } from '../../../../models/custome_types';
import { UserActivityService } from '../../services/user-activity.service';
import { CartService } from '../../services/cart.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Store } from '../../../../app-store/store';

@Component({
    selector: 'app-store-front',
    templateUrl: './store-front.component.html',
    styleUrls: ['./store-front.component.css']
})
export class StoreFrontComponent implements OnInit {

    // scroll target
    @ViewChild('BottomPage')
    public BottomPage: ElementRef

    public UserName: string;
    public FeaturedProducts$: Observable<FeaturedProducts>;

    constructor(
        private AuthService: AuthService,
        private ProductService: ProductsService,
        private UserActivityService: UserActivityService,
        private CartService: CartService,
        private Store: Store,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.UserName = this.AuthService.User.FirstName
        this.FeaturedProducts$ = this.Store.select(['FeaturedProducts'])
        this.initializeStore();
        if (!this.AuthService.User.HasBeenInitialized) {
            this.initializeUser();
        }
    }

    initializeStore() {
        this.ProductService.getFeaturedProducts()
        this.ProductService.getGalleryProducts("Bakery", "1")
    }

    initializeUser() {
        const userCart = this.CartService.fetchUserCart()
        const userActivity = this.UserActivityService.fetchUserActivity();
        Observable.forkJoin(userCart, userActivity)
            .subscribe(
            (userInitData: [Cart, UserActivity]) => {
                if (userInitData[0] && userInitData[1]) {
                    this.AuthService.User.HasBeenInitialized = true;
                }
                if (userInitData[1].LastLogin === null) {
                    this.NotificationsService.notifyClient(
                        {
                            Type: 'success',
                            Title: 'Welcome to food mart express!',
                            Message: `Hello ${this.UserName}, welcome to your first food mart express experience. Have fun!`,
                            dismissButton: 'Continue'
                        }
                    )
                }
                this.UserActivityService.updateLastLogin().subscribe()

            },
            err => console.log(err))
    }

    scrollIntoView(targetPage: string, selectedCategory: string) {
        let block: ScrollLogicalPosition = (targetPage == 'topPage') ? 'end' : 'start';
        let scrollOptions: ScrollIntoViewOptions = {
            behavior: 'smooth',
            block: block,
            inline: 'nearest'
        }
        this.BottomPage.nativeElement.scrollIntoView(scrollOptions);
        // this.browseGallery(selectedCategory)
    }
}
