import React from "react";
import 'antd/dist/antd.css';
import './navbar.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link, Routes, Route, Router} from "react-router-dom";
import Catalog from "./catalog";
import DelPay from "./delivery_payment";
import Contacts from "./contacts";
import Reviews from "./reviews";
import Main from './main';
import Cart from "./cart";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {MdOutlineLocationOn} from "react-icons/md";

const { Header } = Layout;

export function NavBar() {
    return (
        <>
            <Header className="header">
                <div className="header container">
                    <div className="logo">
                        <Link to="/">Vape <span style={{color: "var(--primary)"}}>Shop</span></Link>
                    </div>
                    <div className="header__nav__location">
                        <ul className="nav__menu">
                            <li className="nav__item">
                                <MdOutlineLocationOn className="icon--mg-right"/>
                                Екатеринбург
                            </li>
                        </ul>
                    </div>
                    <div className="header__nav__content">
                        <ul className="nav__menu">
                            <li className="nav__item">
                                <Link to="cart" className="nav__link">
                                    <ShoppingCartOutlined className="icon--mg-right"/>
                                    Корзина
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Header>
            <Header className="header__submenu">
                <div className="header__submenu container">
                    <ul className="nav__menu nav__submenu">
                        <li className="nav__item"><Link className="nav__link" to="catalog">Каталог</Link></li>
                        <li className="nav__item"><Link className="nav__link" to="delivery-payment">Доставка и оплата</Link></li>
                        <li className="nav__item"><Link className="nav__link" to="contacts">Контакты</Link></li>
                        <li className="nav__item"><Link className="nav__link" to="reviews">Отзывы</Link></li>
                    </ul>
                </div>
            </Header>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/delivery-payment" element={<DelPay/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    );
}
