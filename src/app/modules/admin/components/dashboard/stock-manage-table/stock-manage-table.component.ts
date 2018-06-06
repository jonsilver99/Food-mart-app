import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Product } from '../../../../../models/interfaces';
import { ProductsService } from '../../../../shared/services/products.service';
import { NotificationsService } from '../../../../core/services/notifications.service';

@Component({
    selector: 'app-stock-manage-table',
    templateUrl: './stock-manage-table.component.html',
    styleUrls: ['./stock-manage-table.component.css']
})
export class StockManageTableComponent implements OnInit, OnChanges {

    @Input() public Stock: Product[]

    public StockManageForm: FormGroup;

    constructor(
        private FB: FormBuilder,
        private ProductService: ProductsService,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.initForm()
    }

    ngOnChanges(changes: SimpleChange | any) {
        this.initForm()
    }

    initForm() {
        let reactiveProducts: FormGroup[] = this.Stock.map(product => {
            return this.createReactiveProduct(product)
        })
        this.StockManageForm = this.FB.group({
            Products: this.FB.array(reactiveProducts)
        })
    }

    createReactiveProduct(product: Product): FormGroup {
        const reactiveProduct = this.FB.group({
            _id: [product._id],
            ProductName: [product.ProductName],
            ProductPicture: [product.ProductPicture],
            Category: [product.Category],
            Description: [product.Description],
            UnitPrice: [product.UnitPrice],
            UnitsSold: [product.UnitsSold],
            UnitsInStock: [product.UnitsInStock],
            UnitsOnOrder: [product.UnitsOnOrder],
            Discount: [product.Discount]
        })
        return reactiveProduct;

    }

    get reactiveProducts() {
        return (this.StockManageForm.get('Products') as FormArray).controls
    }

    onEditProduct(updatedProduct: Product) {
        this.ProductService.updateProduct(updatedProduct)
            .subscribe(result => this.NotificationsService.notifyClient({ Type: 'success', Message: result }))
    }


}
