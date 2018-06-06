import { Product } from "./interfaces";

// used in modules.guard to resolve if module can load and, if it cant, where to redirect the app
export type CanLoadResolve = { canload: boolean, redirectPath?: string }

// featured product carousel init data type
export type FeaturedProducts = Category[]
export type Category = {
    Name?: string,
    Products?: Array<Product> /*this will be array of products*/
};

// product gallery browse action - when browsing the gallery the api will return the products in the page being browsed
export type GalleryBrowseAction = {
    ProductsInThisPage: Product[],
    TotalPages: number[],
    FromSearch?: string
}

// delivery dates resolve - used in check out to auto-select earliest available date, and determine unavaliable dates
export type DeliveryDates = {
    unavailable: any[],
    earliestAvailable: any,
}

export type accordionState = {
    OpenedTabs: {
        Sales: boolean,
        ManageStock: boolean,
    }
    SelectedAction: 'trendGraph' | 'allProducts' | 'topSellers' | 'lowOnStock' | 'addProduct'
}