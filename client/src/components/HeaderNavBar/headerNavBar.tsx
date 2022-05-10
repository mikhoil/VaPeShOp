import React from "react";
import 'antd/dist/antd.css';
import './headerNavBar.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link, Routes, Route, Router} from "react-router-dom";
import {Catalog} from "../Catalog/catalog";
import {DeliveryPayment} from "../DeliveryPayment/deliveryPayment";
import {Contacts} from "../Contacts/contacts";
import {Reviews} from "../Reviews/reviews";
import {Main} from '../Main/main';
import {Cart} from "../Cart/cart";

import {MdOutlineLocationOn} from "react-icons/md";
import {BiUser, BiSearch} from "react-icons/bi";
import {IoCartOutline} from "react-icons/io5";

const { Header } = Layout;

export const HeaderNavBar = () => {
    return (
        <>
            <Header className="header">
                <div className="header container">
                    <div className="header__nav__logo">
                        <ul className="nav__menu">
                            <li className="nav__item">
                                <div className="logo">
                                    <Link to="/">Vape <span style={{color: "var(--primary)"}}>Shop</span></Link>
                                </div>
                            </li>
                            <li className="nav__item">
                                <MdOutlineLocationOn className="icon--mg-right"/>
                                Екатеринбург
                            </li>
                        </ul>
                    </div>
                    <div className="header__nav__content">
                        <ul className="nav__menu">
                            <li className="nav__item">
                                <Link to="#" className="nav__link">
                                    <BiSearch className="icon--mg-right"/>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="#" className="nav__link">
                                    <BiUser className="icon--mg-right"/>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="cart" className="nav__link">
                                    <IoCartOutline className="icon--mg-right"/>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link" href="tel:88005553535">8 800 555 35 35</a>
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
                <Route path="/delivery-payment" element={<DeliveryPayment/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    );
}
