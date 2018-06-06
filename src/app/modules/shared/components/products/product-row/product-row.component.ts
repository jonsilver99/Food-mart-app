import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartItem, Product } from '../../../../../models/interfaces';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: '[app-product-row]',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

    // component mode options
    @Input() public Mode: "CartMode" | "CheckoutMode" | "EditProductMode";

    // Cart mode - reactive cart item
    @Input() public ReactiveCartItem?: FormGroup

    // Checkout mode - cartItem
    @Input() public CartItem?: CartItem;

    // Edit product mode
    @Input() public ReactiveProduct?: FormGroup;

    // events/emitters
    @Output()
    public RemoveCartItem: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    @Output()
    public EditProduct: EventEmitter<Product> = new EventEmitter<Product>();

    // Image config
    public S3FolderPath: string = environment.S3FolderPath
    @Input() public ProxyImage: boolean = false;
    public ProxyEndpoint: String = environment.ProxyEndpoint

    constructor() { }

    ngOnInit() { }

    determineImageSrc() {
        const picName = this.getProductFieldValue('ProductPicture')
        let src = '';
        if (this.ProxyImage) src = `${this.ProxyEndpoint}/?picName=${picName}`
        else src = `${this.S3FolderPath}/${picName}`
        return src
    }

    getProductFieldValue(fieldName: string) {
        switch (this.Mode) {
            case 'CartMode': {
                return this.ReactiveCartItem.get('Product').value[fieldName]
            }
            case 'CheckoutMode': {
                return this.CartItem.Product[fieldName];
            }
            case 'EditProductMode': {
                return this.ReactiveProduct.get(fieldName).value
            }
        }
    }

    removeCartItem() {
        this.RemoveCartItem.emit(this.ReactiveCartItem)
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.ReactiveCartItem.get(`${fieldName}`).invalid
    }

    getFieldErrors(fieldName: string): boolean | any {
        return this.ReactiveCartItem.get(`${fieldName}`).errors
    }

    editThisProduct() {
        this.EditProduct.emit(this.ReactiveProduct.value)
    }

}
