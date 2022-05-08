import React, {useState} from "react";
import ProductCard from "./product_card";
import {Product} from "./product";
import {Collapse} from "antd";
import {Slider} from "antd";
import {Checkbox} from "antd";

import './catalog.css'

import vapeImg from "../static/resources/img/vape1.png";

const { Panel } = Collapse;

export default function Catalog(): JSX.Element {
    const [state, setState] = useState({
        products: [{
                name: 'Eleaf iJust 3 Kit',
                price: 3300,
                photo: vapeImg,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Пока не кринжанул', mark: 2},
                    {author: 'Андрей', text: 'Кайфарики 8)', mark: 4},
                    {author: 'Петя', text: 'Круто', mark: 5}
                ],
                color: 'lightgreen'
            },
            {
                name: 'Smoant Charon Baby POD Kit',
                price: 2600,
                photo: 'https://babylonvape.ru/upload/resize_cache/iblock/1d1/400_400_140cd750bba9870f18aada2478b24840a/1d1f9a2b0be9ad83b9db0cd294bda278.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Alles gut!', mark: 5},
                ],
                color: '#ffc107'
            },
            {
                name: 'Набор Voopoo V Thru Pro',
                price: 3700,
                photo: vapeImg,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Что это, черт побери, такое?!', mark: 3},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            },
            {
                name: 'Набор Voopoo V Thru Pro',
                price: 3700,
                photo: vapeImg,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Что это, черт побери, такое?!', mark: 3},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            },
            {
                name: 'Набор Voopoo V Thru Pro',
                price: 3700,
                photo: vapeImg,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Что это, черт побери, такое?!', mark: 3},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            },
            {
                name: 'Набор Voopoo V Thru Pro',
                price: 3700,
                photo: vapeImg,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque cum cupiditate ' +
                    'debitis deleniti dolorem eaque earum enim iste labore necessitatibus, nemo officiis pariatur quae ' +
                    'sed totam veniam voluptatem voluptates.',
                reviews: [
                    {author: 'Миша', text: 'Что это, черт побери, такое?!', mark: 3},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5},
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            }]
    });

    const brandCheckboxOptions = ['VooPoo', 'Eleaf', 'Smoant', "GeekVape"];
    const puffCheckboxOptions = ["Свободная (DL)", "Тугая (MTL)"];
    const colorCheckboxOptions = ["Белый", "Черный", "Синий", "Красный"];

    return (
        <>
            <section className="catalog">
                <div className="section-info">

                </div>
                <div className="section-info">
                    <h2 className="section-info__title">Каталог</h2>
                </div>
                <div className="catalog__container">
                    <div className="filter">
                        <Collapse defaultActiveKey={["1", "2", "3", "4", "5"]} ghost>
                            <Panel className="filter__price" key="1" header="Цена">
                                <Slider
                                    min={1200}
                                    max={5000}
                                    defaultValue={[1200, 5000]}
                                    range
                                />
                            </Panel>
                            <Panel className="filter__accumulator" key="2" header="Ёмкость аккумулятора">
                                <Slider
                                    min={520}
                                    max={6000}
                                    defaultValue={[520, 6000]}
                                    range
                                />
                            </Panel>
                            <Panel className="filter__brands" key="3" header="Бренд">
                                <Checkbox.Group options={brandCheckboxOptions}>
                                </Checkbox.Group>
                            </Panel>
                            <Panel key="4" header="Тип затяжки">
                                <Checkbox.Group options={puffCheckboxOptions}>
                                </Checkbox.Group>
                            </Panel>
                            <Panel key="5" header="Цвет">
                                <Checkbox.Group options={colorCheckboxOptions}>
                                </Checkbox.Group>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className="products__items catalog__items">
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
                </div>
            </section>
        </>
    );
}