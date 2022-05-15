import React, {useContext, useEffect, useState} from 'react';
import './App.css';

import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {HeaderNavBar} from "./components/HeaderNavBar/headerNavBar";
import {Spin} from "antd";
import {AppRouter} from "./components/AppRouter/appRouter";
import {Context} from "./index";
import {check} from "./http/userApi";
import {getProductFromCart} from "./http/productApi";

export const App = observer( () => {
    const {user, cart} = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setLoading(true);
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [user]);

    useEffect(() => {
        if(!user.isAuth) {
            cart.setDeleteAllProductFromCart();
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            for (let key in savedCart) {
                cart.setCart(savedCart[key]);
            }
        } else {
            cart.setDeleteAllProductFromCart();
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            if (savedCart) {
                for (let key in savedCart) {
                    cart.setCart(savedCart[key]);
                }
            } else {
                getProductFromCart().then(data => {
                    for (let key in data) {
                        cart.setCart(data[key], true);
                    }
                })
            }
        }
    }, [cart, user.isAuth]);

    if (loading) {
        return (
            <div className="loader">
                <Spin/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <HeaderNavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})