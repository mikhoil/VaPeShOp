import React from "react";
import './navbar.css';
import {Link, Routes, Route} from "react-router-dom";
import Catalog from "./catalog";
import DelPay from "./delivery_payment";
import Contacts from "./contacts";
import Reviews from "./reviews";
import Main from './main';

export function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <div className='nav-item'><Link to="/">Главная</Link></div>
                    </li>
                    <li>
                        <div className="nav-item"><Link to="catalog">Каталог</Link></div>
                    </li>
                    <li>
                        <div className="nav-item"><Link to="delivery-payment">Доставка и оплата</Link>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item"><Link to="contacts">Контакты</Link></div>
                    </li>
                    <li>
                        <div className="nav-item"><Link to="reviews">Отзывы</Link></div>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path="catalog" element={<Catalog/>}/>
                <Route path="delivery-payment" element={<DelPay/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
            </Routes>
        </>
    );
}