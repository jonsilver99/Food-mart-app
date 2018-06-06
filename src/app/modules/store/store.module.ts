import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreFrontComponent } from './components/store-front/store-front.component';
import { StoreRoutingModule } from './store-routing.module';
import { StoreHeaderComponent } from './components/store-front/store-header/store-header.component';
import { CartComponent } from './components/cart/cart.component';
import { FeaturedProductsCarousel } from './components/store-front/featured-products-carousel/featured-products-carousel.component';
import { RecentlyViewedProductsComponent } from './components/store-front/recently-viewed-products/recently-viewed-products.component';
import { ProductsGalleryComponent } from './components/store-front/products-gallery/products-gallery.component';
import { UserActivityService } from './services/user-activity.service';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckOutGuard } from './services/check-out.guard';
import { OrderService } from './services/order.service';
import { CartSummaryComponent } from './components/checkout/cart-summary/cart-summary.component';
import { OrderFormComponent } from './components/checkout/order-form/order-form.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { OrderRecordComponent } from './components/purchase-history/order-record/order-record.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        StoreRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        StoreHeaderComponent,
        StoreFrontComponent,
        CartComponent,
        FeaturedProductsCarousel,
        RecentlyViewedProductsComponent,
        ProductsGalleryComponent,
        ViewProductComponent,
        CheckoutComponent,
        CartSummaryComponent,
        OrderFormComponent,
        PurchaseHistoryComponent,
        OrderRecordComponent,
    ],
    providers:[ UserActivityService, CartService, OrderService, CheckOutGuard ]
})
export class StoreModule { }
