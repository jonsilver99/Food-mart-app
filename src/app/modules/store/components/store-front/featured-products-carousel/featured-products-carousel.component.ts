import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryCarouselAnimations } from './animations';
import { Product } from '../../../../../models/interfaces';
import { FeaturedProducts, Category } from '../../../../../models/custome_types';

@Component({
    selector: 'app-featured-products-carousel',
    templateUrl: './featured-products-carousel.component.html',
    styleUrls: ['./featured-products-carousel.component.css', '../store-front.component.css'],
    animations: CategoryCarouselAnimations
})
export class FeaturedProductsCarousel implements OnInit, OnChanges {

    @Input()    
    public UserName: string;

    /*Start shopping click emitter*/
    @Output()
    public StartShoppingClick: EventEmitter<any> = new EventEmitter<any>();

    /*Animations control*/
    private IsAnimating = false;
    public ShowCategoryInfo = true;
    public ShowCategoryOffers = true;

    /*Selected category*/
    @Input()
    public FeaturedProducts: Array<Category> = []
    public IndexMarker: number = 0
    public SelectedCategory: Category = { Name: 'Bakery' };

    constructor() { }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.FeaturedProducts.currentValue) {
            this.SelectedCategory = this.FeaturedProducts[this.IndexMarker]
        }
    }

    switchCategory(direction) {
        if (this.IsAnimating) return;
        // animate items out
        this.IsAnimating = true;
        this.ShowCategoryOffers = false;
        this.ShowCategoryInfo = false;

        // determine which is next category
        if (direction == 'previous') this.IndexMarker -= 1;
        else this.IndexMarker += 1
        if (this.IndexMarker > 5) this.IndexMarker = 0;
        if (this.IndexMarker < 0) this.IndexMarker = 5;

        this.SelectedCategory = this.FeaturedProducts[this.IndexMarker];

        setTimeout(() => {
            this.ShowCategoryInfo = true;
            this.ShowCategoryOffers = true;
            setTimeout(() => {
                this.IsAnimating = false;
            }, 500);
        }, 500);
    }

    onStartShoppingClicked(category?: String) {
        if (!category) category = "default"
        this.StartShoppingClick.emit(this.SelectedCategory.Name);
    }
}