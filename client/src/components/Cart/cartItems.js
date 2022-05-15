// @flow 
import * as React from 'react';
import {CartItemType} from "../CartItem/cartItemType";
import {CartItem} from "../CartItem/cartItem";
import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

export const CartItems = observer(() => {
    const {cart} = useContext(Context)

    if (cart.cart.length === 0) {
        return (
            <div className="cart-empty">Здесь пока пусто</div>
        )
    }

    return (
        <>
            {
                cart.cart.map((product) =>
                    <CartItem key={product.id} product={product}/>
                )
            }
        </>
    );
})