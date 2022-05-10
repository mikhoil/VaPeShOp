import React, {useState} from 'react';
import {CartItemType} from "./cartItemType";
import {DeleteOutlined} from '@ant-design/icons';

export const CartItem = ({id, brand, name, price, photo, count, totalPrice}: CartItemType): JSX.Element => {
    return (
        <>
            <div className="cart-items__item">
                <div className="cart-items__item-block cart-items__item-cover">
                    <img className="cart-items__item-img" src={`/resources/img/${photo}`} alt={brand + ":" + name}/>
                </div>
                <div className="cart-items__item-block cart-items__item-info">
                    <div className="cart-items__item-title">
                        {brand}
                    </div>
                    <div className="cart-items__item-text">
                        {name}
                    </div>
                    <div className="cart-items__item-price">
                        {price} Р x {count} шт.
                    </div>
                </div>
            </div>
        </>
    );
}