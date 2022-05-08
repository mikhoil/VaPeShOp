import React, {useState} from "react";
import {CartItemType} from "./cart_item_type.js";
import CartItem from "./cart_item";

export default function Cart(): JSX.Element {
    const [state, setState] = useState({
        order_products: [
            {
                name: 'Eleaf iJust 3 Kit 3000 mah with Ello Duro',
                price: 3300,
                photo: 'https://babylonvape.ru/upload/iblock/9ba/9ba655ecba32f57b98a5d01a98949b68.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Пока не кринжанул', mark: 4},
                    {author: 'Андрей', text: 'Кайфарики 8)', mark: 5},
                    {author: 'Петя', text: 'Круто', mark: 5}
                ],
                color: 'lightgreen'
            }
        ]
    });

    return (
        <>
            <div className='cart-items' style={{
                display: "flex",
                justifyContent: "center",
                padding: 25
            }}>
                {
                    state.order_products.map(({
                                                  name,
                                                  price,
                                                  photo,
                                                  description,
                                                  color
                                              }: CartItemType, key: number): JSX.Element =>
                        <CartItem
                            key={key}
                            name={name}
                            price={price}
                            photo={photo}
                            description={description}
                            color={color}
                        />
                    )
                }
            </div>
        </>
    )
}