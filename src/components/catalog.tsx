import React, {useState} from "react";
import ProductCard from "./product_card";
import {Product} from "./product";

export default function Catalog(): JSX.Element {
    const [state, setState] = useState({
        products: [{
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
        },
            {
                name: 'Smoant Charon Baby POD Kit 750 mah with картридж Charon Baby',
                price: 2600,
                photo: 'https://babylonvape.ru/upload/resize_cache/iblock/1d1/400_400_140cd750bba9870f18aada2478b24840a/1d1f9a2b0be9ad83b9db0cd294bda278.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Alles gut!', mark: 5},
                    {author: 'Андрей', text: 'WoW!!!', mark: 5}
                ],
                color: '#ffc107'
            },
            {
                name: 'Набор Voopoo V Thru Pro',
                price: 3700,
                photo: 'https://babylonvape.ru/upload/resize_cache/iblock/b50/400_400_140cd750bba9870f18aada2478b24840a/b50f18f6d6c2d418baabe64ba064aff1.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Что это, черт побери, такое?!', mark: 3},
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            }]
    });
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: "space-around"
            }}>
            {
                state.products.map(({
                                        name,
                                        price,
                                        photo,
                                        description,
                                        reviews,
                                        color
                                    }: Product, key: number): JSX.Element =>
                    <ProductCard
                        key={key}
                        name={name}
                        price={price}
                        photo={photo}
                        description={description}
                        reviews={reviews}
                        color={color}
                    />
                )
            }
        </div>
    );
}