// @flow 
import * as React from 'react';
import {CartItemType} from "./cart_item_type";
import CartItem from "./cart_item";
import {useEffect, useState} from "react";

type Props = {
    items: Array<CartItemType>
};

export const OrderFormListItems = (props: Props) => {
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