import React from 'react';
import './App.css';
import {Logo} from "./components/logo";
import {NavBar} from "./components/navbar";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Cart from './components/cart';
import Footer from "./components/footer";
import {Breadcrumb} from "antd";

function App(): JSX.Element {
    const breadcrumbNameMap = new Map<string, string>();
    breadcrumbNameMap.set('/', 'Главная');
    breadcrumbNameMap.set('/catalog', 'Каталог');
    breadcrumbNameMap.set('/delivery-payment', 'Доставка и оплата');
    breadcrumbNameMap.set('/contacts', 'Контакты');
    breadcrumbNameMap.set('/reviews', 'Отзывы');
    breadcrumbNameMap.set('/cart', 'Корзина');

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link className="breadcrumbs__link" to={url}>{breadcrumbNameMap.get(url)}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link className="breadcrumbs__link" to="/">Главная</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div className="app__wrapper">
            <div className="app app__content container container__pd-top">
                {location.pathname !== "/" &&
                    <div className="breadcrumbs">
                        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                    </div>
                }
                <NavBar/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;