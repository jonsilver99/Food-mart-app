// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    BaseUrl: "http://localhost:4200",
    BaseServerUrl: "http://localhost:4000",
    CheckIfUniqueValue:"http://localhost:4000/auth/assertUniqueValue",
    SignUpUrl:"http://localhost:4000/auth/signup",
    SignInUrl:"http://localhost:4000/auth/signin",
    VerifyTokenUrl:"http://localhost:4000/api",
    ProductsUrl:"http://localhost:4000/api/products",
    ProductsSearchUrl:"http://localhost:4000/api/products/search",
    UserActivityUrl:"http://localhost:4000/api/useractivity",
    CartUrl:"http://localhost:4000/api/cart",
    OrdersUrl:"http://localhost:4000/api/orders",
    S3FolderPath:"https://s3.eu-central-1.amazonaws.com/food.mart.files/productPhotos",
    ProxyEndpoint: "http://localhost:4200/imageproxy"
};
