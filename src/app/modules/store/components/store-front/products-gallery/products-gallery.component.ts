import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../../../models/interfaces';
import { AuthService } from '../../../../auth/services/auth.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { GalleryBrowseAction } from '../../../../../models/custome_types';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { Store } from '../../../../../app-store/store';

@Component({
    selector: 'app-products-gallery',
    templateUrl: './products-gallery.component.html',
    styleUrls: ['./products-gallery.component.css', '../store-front.component.css']
})
export class ProductsGalleryComponent implements OnInit, OnDestroy {

    // product gallery
    public AllCategories = ['Bakery', 'Dairy', 'Drinks', 'MeatAndSeafood', 'Pantry', 'VeggiesAndFruits']
    public SelectedCategory: string = 'Bakery'
    public TotalPages: number[] = [];
    public CurrentPage: string = "1";
    public GalleryProducts: Product[];

    public GalleryBrowseAction: Subscription;
    // save past search queries
    private FromSearchQuery: string;

    constructor(
        private AuthService: AuthService,
        private ProductService: ProductsService,
        private Store: Store
    ) { }

    ngOnInit() {
        this.GalleryBrowseAction = this.Store.select(['GalleryBrowseAction'])
            .subscribe(
            (data: GalleryBrowseAction) => {
                if (data) {
                    if (parseInt(this.CurrentPage) > data.TotalPages.length) this.CurrentPage = "1";
                    this.TotalPages = data.TotalPages;
                    this.GalleryProducts = data.ProductsInThisPage;
                    this.FromSearchQuery = data.FromSearch
                }
            },
            err => console.log(err),
        )
    }

    browseGallery(category?: string, page?: string) {
        // if user selected a category - clear the search query and browse category
        if (category) this.FromSearchQuery = null;

        if (page == 'next') {
            // if requested 'next' page and current page is last one - cancel browse action and return.
            if (this.onLastGalleryPage()) return
            let nextPage = (parseInt(this.CurrentPage) + 1).toString();
            page = nextPage;
        }
        if (page == 'prev') {
            // if requested 'prev' page and current page is first one cancel browse action and return.
            if (this.onFirstGalleryPage()) return
            let previousPage = (parseInt(this.CurrentPage) - 1).toString();
            page = previousPage;
        }

        this.SelectedCategory = category || this.SelectedCategory
        this.CurrentPage = page || "1"

        // if user paginates a multi page search query - resend the last query to server with next page, else - paginate the current category
        if (this.FromSearchQuery) return this.ProductService.searchProductsByName(this.FromSearchQuery, this.CurrentPage).subscribe()
        else this.ProductService.getGalleryProducts(this.SelectedCategory, this.CurrentPage)
    }

    onLastGalleryPage() {
        return (parseInt(this.CurrentPage) == this.TotalPages[this.TotalPages.length - 1]);
    }

    onFirstGalleryPage() {
        return (parseInt(this.CurrentPage) == this.TotalPages[0]);
    }

    ngOnDestroy() {
        this.GalleryBrowseAction.unsubscribe();
    }

}
