import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../../../models/interfaces';
import { environment } from '../../../../../../environments/environment';


@Component({
    selector: 'app-product-gallery-card',
    templateUrl: './product-gallery-card.component.html',
    styleUrls: ['./product-gallery-card.component.css']
})
export class ProductGalleryCardComponent implements OnInit {

    @Input()
    public ProductData: Product;

    public S3FolderPath: string = environment.S3FolderPath

    constructor(
        private ProductService: ProductsService,
    ) { }

    ngOnInit() {
    }

    viewProduct() {
        this.ProductService.viewAProduct(this.ProductData);
    }

    styleByProductFlags(){
        if (this.ProductData.UnitsInStock < 1) return 'outOfStock'
        else if (this.ProductData.BestSeller) return 'bestSeller'
        else if (this.ProductData.New) return 'new'
        else if (this.ProductData.Discount > 0) return 'onSale'
        
    }

}
