import React, {useState} from 'react';
import './main.css'
import { Link, Routes, Route } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { Button } from "antd";

import CatalogCard from "./catalogCard";
import {Product} from "./product";
import newProductImg from "../static/resources/img/ice.png";
import catalogData from "../catalogData";

export default function Main(): JSX.Element {
    const [catalogProducts, setCatalogProducts] = useState(catalogData);

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
                        <span className="background-text__title">NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW</span>
                    </div>
                    <div className="section-info">
                        <h2 className="section-info__title">Новинки</h2>
                    </div>
                    <div className="products__items">
                        {/* название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                         подробнее - также Link на страницу товара */}
                        {
                            catalogProducts.map(({
                                                    id,
                                                    brand,
                                                    name,
                                                    price,
                                                    photo,
                                                    description,
                                                    reviews
                                                }: Product, key: number): JSX.Element =>
                                <CatalogCard
                                    id={id}
                                    key={key}
                                    brand={brand}
                                    name={name}
                                    price={price}
                                    photo={photo}
                                    description={description}
                                    reviews={reviews}
                                />
                            )
                        }
                    </div>
                </section>
                <section className="sale-products">
                    <div className="background-text">
                        <span className="background-text__title">SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE</span>
                    </div>
                    <div className="section-info">
                        <h2 className="section-info__title">Распродажа</h2>
                    </div>
                    <div className="products__items">
                        {/* название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                         подробнее - также Link на страницу товара */}
                        {
                            catalogProducts.map(({
                                                     id,
                                                     brand,
                                                     name,
                                                     price,
                                                     photo,
                                                     description,
                                                     reviews
                                                 }: Product, key: number): JSX.Element =>
                                <CatalogCard
                                    id={id}
                                    key={key}
                                    brand={brand}
                                    name={name}
                                    price={price}
                                    photo={photo}
                                    description={description}
                                    reviews={reviews}
                                />
                            )
                        }
                    </div>
                </section>
                <section className="about-us">
                    <div className="background-text">
                        <span className="background-text__title">ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US ABOUT US</span>
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