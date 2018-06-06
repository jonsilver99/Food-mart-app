import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../shared/services/products.service';
import { NotificationsService } from '../../../../core/services/notifications.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    // Add product form 
    @ViewChild('imgFileInput') public imgFileInput: ElementRef;
    public AddProductForm: FormGroup;
    public ImgPreviewPath: string = '/assets/default-product.png'

    constructor(
        private FB: FormBuilder,
        private ProductService: ProductsService,
        private NotificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.AddProductForm = this.FB.group({
            ProductName: ['', [Validators.required]],
            Category: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            UnitPrice: ['', [Validators.required]],
            Discount: ['', [Validators.required]],
            UnitsInStock: ['', [Validators.required]],
            UnitsOnOrder: ['', [Validators.required]],
            ProductPicture: [null, [Validators.required]],
        })
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.AddProductForm.get(`${fieldName}`).touched && this.AddProductForm.get(`${fieldName}`).invalid
    }

    getFieldErrors(fieldName: string): boolean | any {
        return this.AddProductForm.get(`${fieldName}`).errors
    }


    onFileLoaded() {
        let reader = new FileReader();
        reader.onloadend = (file: any) => {
            this.ImgPreviewPath = file.target.result
            this.AddProductForm.patchValue({ 'ProductPicture': this.imgFileInput.nativeElement.files[0] })
        }
        reader.readAsDataURL(this.imgFileInput.nativeElement.files[0])
    }


    openFileSelection() {
        this.imgFileInput.nativeElement.click()

    }

    onSubmit() {
        if (this.AddProductForm.invalid) return this.NotificationsService.notifyClient({
            Type: 'alert', Message: 'Invalid form inputs', Timeout: 4000
        })

        let prodData = new FormData()
        Object.keys(this.AddProductForm.controls).forEach(key => {
            prodData.append(key, this.AddProductForm.get(key).value);
        });

        this.ProductService.createNewProduct(prodData)
            .subscribe(result => this.NotificationsService.notifyClient({ Type: 'success', Message: result }))
    }
}
