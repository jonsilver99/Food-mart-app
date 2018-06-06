import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ResolveSpaceAndCapitalsPipe } from './pipes/resolve-space-and-capitals.pipe';
import { CustomFormValidatorsService } from './services/custom-form-validators.service';
import { InvalidFormFieldComponent } from './components/invalid-form-field/invalid-form-field.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ProductGalleryCardComponent } from './components/products/product-gallery-card/product-gallery-card.component';
import { ProductsService } from './services/products.service';
import { ReplaceStringPipe } from './pipes/replace-string.pipe';
import { ViewOnClickDirective } from './directives/view-on-click.directive';
import { ProductRowComponent } from './components/products/product-row/product-row.component';
import { CounterComponent } from './components/counter/counter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AmmendPhoneNumberDirective } from './directives/ammend-phone-number.directive';
import { AmmendCreditCardNumberDirective } from './directives/ammend-credit-card-number.directive';
import { SearchComponent } from './components/search/search.component';
import { OrderService } from '../store/services/order.service';
import { IllegalCharsFilterDirective } from './directives/illegal-chars-filter.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavBarComponent,
        LoadingSpinnerComponent,
        ResolveSpaceAndCapitalsPipe,
        InvalidFormFieldComponent,
        DropdownDirective,
        ProductGalleryCardComponent,
        ReplaceStringPipe,
        ViewOnClickDirective,
        ProductRowComponent,
        CounterComponent,
        AmmendPhoneNumberDirective,
        AmmendCreditCardNumberDirective,
        SearchComponent,
        IllegalCharsFilterDirective,
    ],
    exports: [
        NavBarComponent,
        LoadingSpinnerComponent,
        ResolveSpaceAndCapitalsPipe,
        ReplaceStringPipe,
        InvalidFormFieldComponent,
        DropdownDirective,
        ProductGalleryCardComponent,
        ViewOnClickDirective,
        ProductRowComponent,
        CounterComponent,
        AmmendPhoneNumberDirective,
        AmmendCreditCardNumberDirective,
        SearchComponent,
        IllegalCharsFilterDirective
    ],
    providers:[
        CustomFormValidatorsService,
        ProductsService,
        OrderService,
    ]
})
export class SharedModule { }
