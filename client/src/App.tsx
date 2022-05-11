import React from 'react';
import './App.css';
import {HeaderNavBar} from "./components/HeaderNavBar/headerNavBar";
import {Footer} from "./components/Footer/footer";
import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import {Breadcrumb} from "antd";
import {Main} from "./components/Main/main";
import {Catalog} from "./components/Catalog/catalog";
import {DeliveryPayment} from "./components/DeliveryPayment/deliveryPayment";
import {Contacts} from "./components/Contacts/contacts";
import {Reviews} from "./components/Reviews/reviews";
import {Cart} from "./components/Cart/cart";
import {CatalogCardContent} from "./components/Catalog/catalogCardContent";
import {CatalogProduct} from "./components/Catalog/catalogProduct";
import {AppRouter} from "./components/AppRouter/appRouter";

export const App = () => {
    return (
        <BrowserRouter>
            <HeaderNavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}