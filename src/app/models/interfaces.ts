import { FeaturedProducts, GalleryBrowseAction } from "./custome_types";
import { FormGroup, FormArray } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthState {
    IsSignedIn: boolean,
    Token: string,
    User: User
}

export interface User {
    _id?: string,
    Role: string | boolean,
    Identification?: string | number,
    Email?: string,
    Password?: string,
    PassConfirm?: string,
    FirstName: string,
    LastName: string,
    Phone: string | number,
    City: String,
    Street: string,
    HasBeenInitialized?: boolean,
}

export interface UserActivity {
    _id?: string,
    User_id: string,
    PurchaseHistory?: Array<Order>,
    WishList?: Array<Product>,
    RecentlyViewd?: Array<Product>,
    LastLogin?: Date
}

export interface Product {
    _id?: string,
    ProductName: String,
    ProductPicture: String,
    Category: string,
    Description: String,
    UnitPrice: number,
    UnitsInStock: number,
    UnitsOnOrder: Number,
    UnitsSold: Number,
    Discount: Number,
    DateAdded: Date,
    New?: boolean,
    BestSeller?: boolean
}

export interface Cart {
    _id?: string,
    User_id?: string,
    DateCreated?: Date,
    DateClosed?: Date,
    ItemsInCart?: CartItem[],
}

export interface CartItem {
    _id?: string,
    Product: Product,
    Qty: number
}

export interface Order {
    _id?: string,
    User_id: string,
    Cart_id: string,
    DateIssued: Date
    DeliveryDate: Date
    SubTotal: number,
    ShippingAndHandling: number,
    GrandTotal: number,
    ShippingDetails: {
        FirstName: string,
        LastName: string,
        Phone: string | number,
        City: String,
        Street: string,
    }
    Payment: {
        Type: 'Credit' | 'Paypal' | 'Bitcoin',
        CardBrand?: 'Visa' | 'Master card' | 'American Express',
        LastFourDigits?: string,
        Transaction_id?: string
    },
    Cart?: {
        ItemsInCart: CartItem[]
    }
}

export interface ApiResponse {
    discriminator: 'ApiResponse',
    success?: boolean,
    message?: string | any,
    data?: any,
    errData?: any,
    authFailed?: boolean
}

export interface AppState {
    _id?: string,
    AuthState?: AuthState,
    FeaturedProducts?: FeaturedProducts,
    GalleryBrowseAction?: GalleryBrowseAction,
    UserActivity?: UserActivity,
    ViewingProduct?: Product,
    ActiveCart?: Cart,
    ValidCheckout?: boolean,
    ClientNotification?: ClientNotification,
    StockProducts?: Product[],
}

export interface ClientNotification {
    Type: "success" | "error" | "alert",
    Title?: string,
    Message: string,
    dismissButton?: string,
    Timeout?: number,
    Dismissable?: boolean,
}




export interface HandledError extends Error {
    handled: boolean
}