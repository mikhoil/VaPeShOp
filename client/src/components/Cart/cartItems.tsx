// @flow 
import * as React from 'react';
import {CartItemType} from "../CartItem/cartItemType";
import {CartItem} from "../CartItem/cartItem";
import {useEffect, useState} from "react";

type Props = {
    items: Array<CartItemType>
};

export const CartItems = (props: Props) => {
    const [listItems, setListItems] = useState(Array<CartItemType>())

    useEffect(() => {
        setListItems(props.items)
    }, [props.items])

    return (
        <>
            {
                listItems.map(({
                                      id,
                                      brand,
                                      name,
                                      price,
                                      photo,
                                      count,
                                      totalPrice
                                  }: CartItemType, key: number): JSX.Element =>
                    <CartItem
                        id={id}
                        brand={brand}
                        key={key}
                        name={name}
                        price={price}
                        photo={photo}
                        totalPrice={totalPrice}
                        count={count}
                    />
                )
            }
        </>
    );
};