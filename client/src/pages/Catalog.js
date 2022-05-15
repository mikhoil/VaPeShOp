import React, {useEffect, useState} from "react";
import '../css/catalog.css'

import {Link} from "react-router-dom";
import {CatalogCard} from "../components/Catalog/catalogCard";
import {fetchTypes} from "../http/productApi";
import {CATALOG_ROUTE} from "../utils/constRoutes";

export const Catalog = () => {
    const [catalogCards, setCatalogCards] = useState([])

    useEffect(() => {
        fetchTypes().then((data) => {
            setCatalogCards(data)
        })
    }, [])

    return (
        <>
            <section className="catalog">
                <div className="section-info">
                    <h2 className="section-info__title">Каталог</h2>
                </div>
                <div className="catalog__container">
                    <div className="products__items catalog__items">
                        {
                            catalogCards.map((card) => {
                                return <Link key={card.id} className="catalog-card__link" to={CATALOG_ROUTE + '/' + card.id}>
                                    <CatalogCard
                                        key={card.id}
                                        type={card.name}
                                        img={card.img}
                                    />
                                </Link>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
}