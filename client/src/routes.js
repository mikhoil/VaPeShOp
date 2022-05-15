import {
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE, CONTACTS_ROUTE, DELIVERY_PAYMENT_ROUTE,
    LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE,
    REGISTRATION_ROUTE, REVIEWS_ROUTE,
    USER_PAGE_ROUTE
} from "./utils/constRoutes";

import {Admin} from "./pages/Admin";
import {UserPage} from "./pages/UserPage";
import {Product} from "./pages/Product";
import {Auth} from "./pages/Auth";
import {Cart} from "./pages/Cart";
import {DeliveryPayment} from "./pages/DeliveryPayment";
import {Contacts} from "./pages/Contacts";
import {Reviews} from "./pages/Reviews";
import {Main} from "./pages/Main";
import {Catalog} from "./pages/Catalog";
import {CatalogCardContent} from "./pages/CatalogCardContent";
import {NoMatch} from "./components/NoMatch/noMatch";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    }
]

export const authRoutes = [
    {
        path: USER_PAGE_ROUTE,
        Component: <UserPage/>
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>
    },
    {
        path: CATALOG_ROUTE,
        Component: <Catalog/>
    },
    {
        path: CATALOG_ROUTE + "/:type",
        Component: <CatalogCardContent/>
    },
    {
        path: CATALOG_ROUTE + "/:type" + PRODUCT_ROUTE + '/:id',
        Component: <Product/>
    },
    {
        path: CART_ROUTE,
        Component: <Cart/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: DELIVERY_PAYMENT_ROUTE,
        Component: <DeliveryPayment/>
    },
    {
        path: CONTACTS_ROUTE,
        Component: <Contacts/>
    },
    {
        path: REVIEWS_ROUTE,
        Component: <Reviews/>
    },
    {
        path: "*",
        Component: <NoMatch/>
    }
]


