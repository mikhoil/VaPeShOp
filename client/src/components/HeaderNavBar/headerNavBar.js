import React, {useContext, useEffect, useState} from "react";
import 'antd/dist/antd.css';
import './headerNavBar.css'
import {Layout, Dropdown, Menu, Badge} from 'antd';
import {Link, useNavigate, useLocation} from "react-router-dom";

import {MdOutlineLocationOn} from "react-icons/md";
import {BiUser, BiSearch} from "react-icons/bi";
import {IoCartOutline} from "react-icons/io5";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {CART_ROUTE, LOGIN_ROUTE, USER_PAGE_ROUTE} from "../../utils/constRoutes";
const { Header } = Layout;

export const HeaderNavBar = observer(() => {
    const {user, cart} = useContext(Context);
    const [totalCartCount, setTotalCartCount] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const cartItems = cart.cart.map((item) => {
        return item.count
    })
    const count = cartItems.reduce((prev, next) => {return prev + next}, 0)

    const [avatarRoute, setAvatarRoute] = useState("")

    useEffect(() => {
        setTotalCartCount(count)
    }, [count])

    useEffect(() => {
        if (user.isAuth) {
            setAvatarRoute(USER_PAGE_ROUTE)
        } else {
            setAvatarRoute(LOGIN_ROUTE)
        }
    }, [user.isAuth])


    return (
        <>
            <div className="header__wrapper">
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
                                    <Link to={avatarRoute} className="nav__link">
                                        <BiUser className="icon--mg-right"/>
                                    </Link>
                                </li>
                                <li className="nav__item">
                                    <Link to={CART_ROUTE} className="nav__link">
                                        <Badge count={totalCartCount} size="small" offset={[2, 0]} color="var(--primary)">
                                            <IoCartOutline className="icon--mg-right"/>
                                        </Badge>
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
            </div>
            <div className="header__wrapper--mobile">

            </div>
        </>
    );
})
