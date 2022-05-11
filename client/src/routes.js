import {
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE, CONTACTS_ROUTE, DELIVERY_PAYMENT_ROUTE,
    LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE,
    REGISTRATION_ROUTE, REVIEWS_ROUTE,
    USER_PAGE_ROUTE
} from "./utils/constRoutes";

import {Admin} from "./components/Admin/admin";
import {UserPage} from "./components/UserPage/userPage";
import {CatalogProduct} from "./components/Catalog/catalogProduct";
import {Auth} from "./components/Auth/auth";
import {Cart} from "./components/Cart/cart";
import {DeliveryPayment} from "./components/DeliveryPayment/deliveryPayment";
import {Contacts} from "./components/Contacts/contacts";
import {Reviews} from "./components/Reviews/reviews";
import {Main} from "./components/Main/main";
import {Catalog} from "./components/Catalog/catalog";
import {CatalogCardContent} from "./components/Catalog/catalogCardContent";
import {NoMatch} from "./components/NoMatch/noMatch";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    },
    {
        path: USER_PAGE_ROUTE,
        component: <UserPage/>
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        component: <Main/>
    },
    {
        path: CATALOG_ROUTE,
        component: <Catalog/>
    },
    {
        path: CATALOG_ROUTE + "/:type",
        component: <CatalogCardContent/>
    },
    {
        path: CATALOG_ROUTE + "/:type" + '/:id',
        component: <CatalogProduct/>
    },
    {
        path: CART_ROUTE,
        component: <Cart/>
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: DELIVERY_PAYMENT_ROUTE,
        component: <DeliveryPayment/>
    },
    {
        path: CONTACTS_ROUTE,
        component: <Contacts/>
    },
    {
        path: REVIEWS_ROUTE,
        component: <Reviews/>
    },
    {
        path: "*",
        component: <NoMatch/>
    }
]


