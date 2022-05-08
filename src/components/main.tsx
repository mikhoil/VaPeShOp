import React, {useState} from 'react';
import './main.css'
import { Link, Routes, Route } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { Button } from "antd";

import ProductCard from "./product_card";
import {Product} from "./product";

import newProductImg from "../static/resources/img/ice.png";
import vapeImg from "../static/resources/img/vape1.png";

export default function Main(): JSX.Element {
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
                    {author: 'Андрей', text: 'WoW!!!', mark: 2}
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
                    {author: 'Андрей', text: 'No comments...', mark: 5}
                ],
                color: 'lightpink'
            }]
    });

    return (
        <>
            <main className="main-container">
                <section className="best-product">
                    <div className="best-product__img">
                        <img src={newProductImg} alt="Ледяная коллекция"/>
                    </div>
                    <div className="best-product__info">
                        <h1 className="best-product__title">Попробуйте нашу новую <span style={{color: "var(--primary)"}}>ледяную коллекцию</span></h1>
                        <h2 className="best-product__subtitle">Добавь холодного пара на спирали своего атомайзера и почувствуй неукротимое буйство ярких, насыщенных вкусов!</h2>
                        <Link className="best-product__link" to="catalog">
                            Заценить новинки
                            <BsArrowRightCircle className="icon--mg-left"/>
                        </Link>
                    </div>
                </section>
                <section className="new-products">
                    <div className="background-text">
                        <span className="background-text__title">NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW</span>
                    </div>
                    <div className="section-info">
                        <h2 className="section-info__title">Новинки</h2>
                    </div>
                    <div className="products__items">
                        {/* название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                         подробнее - также Link на страницу товара */}
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
                </section>
                <section className="sale-products">
                    <div className="background-text">
                        <span className="background-text__title">SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE</span>
                    </div>
                    <div className="section-info">
                        <h2 className="section-info__title">Распродажа</h2>
                    </div>
                    <div className="products__items">
                        {/* название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                         подробнее - также Link на страницу товара */}
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
                </section>
                <section className="about-us">
                    <div className="background-text">
                        <span className="background-text__title">ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US</span>
                    </div>
                    <div className="section-info">
                        <h2 className="section-info__title">О нас</h2>
                    </div>
                    <div className="about-us__text">
                        <p>
                            Наши вейп шопы предлагают купить вейп на любой вкус, от одноразовой электронной сигареты, стартового набора для новичка или POD системы до сверхмощных батарейных и механических модов для рьяных вейперов, которые с легкостью "раскачают" любую намотку вашего бака или дрипки.
                        </p>
                        <p>
                            Качественная электронная сигарета успешно справляется со своей миссией! Тот, кто уже стал пользователем вейпа, не возвращается к традиционной сигарете: большинство отмечают, что их самочувствие значительно улучшилось, обострилось обоняние, ну и сам ароматизированный пар гораздо приятнее, чем курение обычной сигареты.
                        </p>
                        <p>
                            Именно здесь можно купить хороший вейп от именитых производителей, pod системы - джул (Juul), hqd, smoant charon, battlestar, pasito, aegis, минифит (Minifit), suorin (суорин), relx, logic compact, my blu (блю), renova; системы нагревания табака - айкос (iqos), glo (гло), avbad (авбад), hotcig; электронные сигареты начального уровня (starter kit) - iJust З/Рга/21700 (айджаст), Joyetech, Kangertech, Justfog; лучшие боксмоды (вейп моды) - Voopoo Drag 2, Vaporesso Gen/Swag 2 (Banopecco), iJoy Captain 2/Shogun, Wismec RX (Висмек), ViHi, Lost Vape Centaurus DNA 250c.
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}