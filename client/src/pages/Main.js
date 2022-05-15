import React, {useContext, useEffect, useRef, useState} from 'react';
import '../css/main.css'
import { Link, Routes, Route } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

import {CatalogCard} from "../components/Catalog/catalogCard";
import {ProductType} from "../components/CatalogProductItem/productType";
import {CatalogProductItem} from "../components/CatalogProductItem/catalogProductItem";
import {Container} from "../components/Container/container";
import {CatalogSale} from "../components/Catalog/catalogSale";
import {CatalogNew} from "../components/Catalog/catalogNew";

import newProductImg from "../static/img/ice.png"
import {fetchBrands, fetchProducts, fetchProductsBySortValue, fetchTypes} from "../http/productApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {Button} from "antd";

export const Main = observer(() => {
    const {product} = useContext(Context);
    const [newProducts, setNewProducts] = useState([])
    const [saleProducts, setSaleProducts] = useState([])

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchBrands().then(data => product.setBrands(data));
        fetchProductsBySortValue(2, null, 1, 8, 'createdAt', 'DESC').then(data => {
            setNewProducts(data.rows)
        })
        fetchProductsBySortValue(1, null, 1, 8, 'price', 'ASC').then(data => {
            setSaleProducts(data.rows)
        })
        fetchProducts(null, null, 1, product.limit).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(product.selectedType === "all") {
                fetchProducts(null, product.selectedBrand.id, product.page, product.limit).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            } else {
                fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            }
        }, [product.page, product.selectedType, product.selectedBrand],
    );

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
                        {/*название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                    подробнее - также Link на страницу товара*/}
                        <CatalogNew data={newProducts}/>
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
                        {/*название товара обернуть в Link на страницу товара, отзывы также, только с якорем к блоку отзывов,
                    подробнее - также Link на страницу товара*/}
                        <CatalogSale data={saleProducts}/>
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
})