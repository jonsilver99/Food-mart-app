import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../../../app-store/store';
import { GalleryBrowseAction } from '../../../../models/custome_types';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    public SearchField: FormGroup
    public Query: Subscription
    public IsPending: boolean = false;

    constructor(
        private Store: Store,
        private FB: FormBuilder,
        private ProductsService: ProductsService,
    ) { }

    ngOnInit() {
        this.SearchField = this.FB.group({
            Input: ['', []]
        })

        this.Query = this.SearchField.get('Input').valueChanges
            .do(() => this.IsPending = true)
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(searchTerm => {
                if (!searchTerm) {
                    this.ProductsService.getGalleryProducts("Bakery", "1")
                    return Observable.of(false)
                }
                else return this.ProductsService.searchProductsByName(searchTerm)
            })
            .subscribe(
            (result: GalleryBrowseAction | boolean) => this.IsPending = false,
            err => this.IsPending = false)
    }


    ngOnDestroy() {
        this.Query.unsubscribe()
    }


}