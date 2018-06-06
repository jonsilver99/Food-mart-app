import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { Store } from '../../../app-store/store';
import { environment } from '../../../../environments/environment';
import { ApiResponse, Product } from '../../../models/interfaces';
import { CategoryToIdMap } from '../../../models/dictionary';
import { GalleryBrowseAction } from '../../../models/custome_types';

@Injectable()
export class ProductsService {

    constructor(
        private HttpReqs: HttpClient,
        private Store: Store

    ) { }

    getStockProducts(param: string) {
        return this.HttpReqs.get(`${environment.ProductsUrl}/stock/${param}`, { params: { dontCache: 'true' } })
            .map((results: ApiResponse) => {
                const result: Product[] = results.data
                return result;
            })
            .do((result: Product[]) => {
                this.Store.set('StockProducts', result)
            })
    }

    getGalleryProducts(category: string, page: string): any {
        let categoryId = CategoryToIdMap[category];
        return this.HttpReqs.get(environment.ProductsUrl, { params: { category: categoryId, page: page } })
            .map((results: ApiResponse) => {
                return results.data;
            })
            .subscribe((data: GalleryBrowseAction) => this.Store.set('GalleryBrowseAction', data))
    }

    searchProductsByName(query: string, page: string = "1") {
        let params = {
            ProductName: query,
            page: page,
            // dontCache: 'true'
        }
        return this.HttpReqs.get(environment.ProductsSearchUrl, { params: params })
            .map((results: ApiResponse) => {
                const result: GalleryBrowseAction = results.data
                result.FromSearch = query
                return result;
            })
            .catch(err => Observable.throw(err))
            .do((result: GalleryBrowseAction) => {
                this.Store.set('GalleryBrowseAction', result)
            })
    }

    getFeaturedProducts(): any {
        return this.HttpReqs.get(`${environment.ProductsUrl}/featuredproducts`)
            .map((results: ApiResponse) => {
                return results.data;
            })
            .subscribe((data: GalleryBrowseAction) => this.Store.set('FeaturedProducts', data))
    }

    updateProduct(product: Product) {
        let updateData = {}
        for (var prop in product) {
            if (product.hasOwnProperty(prop)) {
                if (prop != '_id') updateData[prop] = product[prop]
            }
        }
        return this.HttpReqs.put(`${environment.ProductsUrl}/${product._id}`, updateData)
            .map((results: ApiResponse) => {
                return results.message
            })
    }

    createNewProduct(prodData: Product | any) {
        return this.HttpReqs.post(environment.ProductsUrl, prodData)
            .map((results: ApiResponse) => {
                return results.message
            })
    }

    viewAProduct(product: Product) {
        this.Store.set('ViewingProduct', product);
    }
}