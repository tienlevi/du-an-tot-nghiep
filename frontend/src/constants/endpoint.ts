export const PRODUCT_ENDPOINT = {
    PRODUCT: '/products',
    DETAILED_VARIANT: '/variantDetail',
    TRENING: '/products/top-sold',
    ALL: '/products/all',
    ALL_ADMIN: '/products/portal/all',
    LATEST: '/products/latest',
    DEALS: '/products/deals',
    REVIEWS: '/products/reviews',
    REVIEWS_DETAIL: '/products/reviews',
    RELATED: '/products/related',
    CREATE: '/products',
    DELETE: '/products',
    UPDATE: '/products',
    UPDATE_VARIATIONS: '/products/variation/',
    CREATE_VARIATIONS: '/products/variation/',
    FILTER: '/products/filter',
    HIDE: '/products/hide', // @productId
    SHOW: '/products/show', // @productId
};
export const CATEGORY_ENDPOINT = {
    ALL: '/categories/all',
    MENU: '/categories/menu',
    POPULAR: '/categories/popular',
    CREATE: '/categories',
    DETAIL: '/categories',
    UPDATE: '/categories',
};
export const CART_ENDPOINT = {
    GET: '/carts',
    ADDCART: '/carts/add',
    UPDATEQUANTITY: '/carts/update_quantity',
    REMOVEITEM: '/carts/remove',
};
export const BRAND_ENDPOINT = {
    ALL: '/brands/all',
    DETAIL: '/brands',
    CREATE: '/brands',
    UPDATE: '/brands',
};

export const AUTH_ENDPOINT = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SENDMAIL: '/auth/sendVerify',
    SENDRESETPASS: '/auth/sendresetPassword',
    VERIFY: '/auth/verifyEmail',
    RESETPASSWORD: '/auth/resetpassword',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders',
    VNPAY: '/create-checkout-with-vnpay',
    SESSION: '/create-checkout-session',
};

export const ORDER_ENDPOINT = {
    GET_ALL_ORDERS: '/orders',
    MY_ORDERS: '/orders/user',
    CANCEL_ORDER: '/orders/cancel',
    CONFIRM_ORDER: '/orders/confirm',
    SHIPPING_ORDER: '/orders/shipping',
    DELIVERED_ORDER: '/orders/delivered',
    FINISH_ORDER: '/orders/done',
    CREATE_ORDER: '/orders',
    DISABLED_REVIEW: '/orders/disabled-review',
};

export const ATTRIBUTES_ENDPOINT = {
    ALL: '/attributes',
    DETAILS: '/attributes/details',
    All: '/attributes/all',
    CREATE: 'attributes',
    UPDATE: 'attributes',
};

export const STATS_ENDPOINT = {
    TOTAL: '/stats/total',
    DAILY_STATS: '/stats/daily',
    MONTHLY_STATS: '/stats/monthly',
    YEARLY_STATS: '/stats/yearly',
    DATE_RANGE: 'stats/dateRange',
    PRODUCTS: '/stats/productStats',
    TOP_BUYERS: '/stats/topBuyers',
};

export const USER_ENDPOINT = {
    PROFILE: '/users/private',
    ALL: '/users/all',
    UPDATE: '/users/private',
    UPDATE_ADMIN: '/users',
    DETAIL: '/users',
};
export const REVIEW_ENDPOINT = {
    GETOFPRODUCT: '/reviews',
    GET_DETAIL: '/reviews',
    GET_ALL: '/reviews/all',
    GET_ALL_REPORT: '/reviews/report/all',
    CREATE_REPORT: 'reviews/report',
    CREATE: '/reviews',
    STARS_REVIEW: '/reviews/stars-review',
    DELETE_REVIEW: '/reviews/',
    DELETE_REPORT: '/reviews/report',
    CHECK_PURCHASED: '/reviews/purchased',
    UPDATE_ISREVIEWED: '/reviews/',
};
export const LOCATION_ENDPOINT = {
    ROOT: '/locations',
    USER: '/locations/user',
};
export const WISHLIST_ENDPOINT = {
    MY_WISHLIST: '/users/private/wish-list',
    ADD_WISHLIST: '/users/private/wish-list/add',
    REMOVE_WISHLIST: '/users/private/wish-list/remove',
};

export const SHIPPING_ENDPOINT = {
    GET_SERVICES: '/shipping/get-service',
    GET_PROVINCE: '/shipping/get-province',
    GET_DISTRICT: '/shipping/get-district',
    GET_WARD: '/shipping/get-ward',
    CALCULATE_FEE: '/shipping/calculate-shipping-fee',
};
