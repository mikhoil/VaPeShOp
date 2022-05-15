import React, {useContext, useEffect, useState} from 'react';
import {CartItemType} from "./cartItemType";
import {DeleteOutlined} from '@ant-design/icons';
import {Context} from "../../index";

export const CartItem = ({product}) => {
    return (
        <>
            <div className="cart-items__item">
                <div className="cart-items__item-block cart-items__item-cover">
                    <img className="cart-items__item-img" src={product.img} alt={product.name}/>
                </div>
                <div className="cart-items__item-block cart-items__item-info">
                    <div className="cart-items__item-title">
                        {product.brand.name}
                    </div>
                    <div className="cart-items__item-text">
                        {product.name}
                    </div>
                    <div className="cart-items__item-price">
                        {product.price} Р x {product.count} шт.
                    </div>
                </div>
            </div>
        </>
    );
}