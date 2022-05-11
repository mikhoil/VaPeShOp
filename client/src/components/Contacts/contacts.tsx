import React, {useRef, useState} from 'react';
import "./contacts.css";
import shopPoints from "../../shopPoints";
import {Link} from "react-router-dom";
import {YMaps, Map, Placemark, FullscreenControl, GeolocationControl, TrafficControl, Clusterer, ZoomControl} from "react-yandex-maps";
import {Container} from "../Container/container";

export const Contacts = () => {
    const [shopList, setShopList] = useState(shopPoints)
    const map =
    <YMaps>
        <Map
            defaultState={{
                center: [56.849895, 60.594858],
                zoom: 11,
            }}
            width="100%"
            height="400px"
        >
            <FullscreenControl/>
            <ZoomControl/>
            <GeolocationControl/>
            <TrafficControl/>
            <Clusterer
                options={{
                    clusterOpenBalloonOnClick: true,
                    clusterBalloonContentLayout: "cluster#balloonTwoColumns",
                    clusterBalloonPanelMaxMapArea: 0,
                    clusterBalloonContentLayoutWidth: 350,
                    clusterBalloonLeftColumnWidth: 120
                }}
            >
                {shopPoints.items.map((shop, index) => {
                    const balloonBody =
                    `<div class="balloon__body">
                        <div class="balloon__block balloon__block-address">
                            <div class="balloon__title">${shop.city}</div>
                            <div class="balloon__text">${shop.address}</div>
                        </div>
                        <div class="balloon__block balloon__block-work-time">
                            <div class="balloon__title">Время работы:</div>
                            <div class="balloon__text">${shop.workTime}</div>
                        </div>
                        <div class="balloon__block balloon__block-phone">
                            <div class="balloon__title">Телефон:</div>
                            <div class="balloon__text">${shop.phone}</div>
                        </div>
                    </div>`

                    const balloonFooter =
                    `<div class="balloon__footer">
                        <a target="_blank" href="https://yandex.ru/maps/?from=api-maps&ll=%20${shop.center[1]},${shop.center[0]}&mode=routes&rtext=~${shop.center[0]},%20${shop.center[1]}&rtt=auto&z=14">Построить маршрут</a>
                    </div>`

                    return <Placemark
                        key={index}
                        geometry={shop.center}
                        properties={{
                            balloonContentBody: balloonBody,
                            balloonContentFooter: balloonFooter,
                        }}
                        options={{

                        }}
                        modules={['geoObject.addon.balloon']}
                    />
                })}
            </Clusterer>
        </Map>
    </YMaps>

    let scrollHash = window.location.hash;
    scrollHash = scrollHash.substring(1, scrollHash.length);

    if (scrollHash) {
        setTimeout(() => {
            const elem = document.getElementById(scrollHash);
            if (elem)
                window.scrollTo({
                    top: elem.offsetTop - 128,
                    behavior: "smooth"
                });
        }, 100);
    }

    return (
        <>
            <section className="contacts">
                <div className="contacts-block">
                    <div className="contacts-block__head">
                        <h2 className="contacts-block__title">Для покупателей</h2>
                    </div>
                    <div className="contacts__panel">
                        <div className="contacts__content">
                            Заказы через интернет-магазин принимаются круглосуточно и <strong>обрабатываются с 11 до 20 часов</strong>. Если вы оформили заказ поздно вечером/ночью/рано утром, он будет обработан в первые два часа работы интернет-магазина.
                        </div>
                        <div className="contacts__list">
                            <div className="contacts__item contacts__item-main">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">Телефон горячей линии</span>
                                </div>
                                <div className="contacts__item-body">
                                    <a className="contacts__item-link" href="tel:88005553535">8 800 555 35 35</a>
                                </div>
                            </div>
                            <div className="contacts__item contacts__item-main">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">Адрес для писем</span>
                                </div>
                                <div className="contacts__item-body">
                                    <a className="contacts__item-link" href="mailto:retail@vapeshop.ru">retail@vapeshop.ru</a>
                                </div>
                            </div>
                            <div className="contacts__item contacts__item-main">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">Онлайн заказы и поддержка</span>
                                </div>
                                <div className="contacts__item-body">
                                    <span className="contacts__item-text">Пн-Вс: 11:00 - 20:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contacts-block">
                    <div className="contacts-block__head">
                        <h2 className="contacts-block__title">Для партнёров</h2>
                    </div>
                    <div className="contacts__panel">
                        <div className="contacts__list">
                            <div className="contacts__item">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">По вопросам оптовых закупок и франшизы</span>
                                </div>
                                <div className="contacts__item-body">
                                    <a className="contacts__item-link" href="mailto:retail@vapeshop.ru">opt@vapeshop.ru</a>
                                </div>
                            </div>
                            <div className="contacts__item">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">Для коммерческих предложений</span>
                                </div>
                                <div className="contacts__item-body">
                                    <a className="contacts__item-link" href="mailto:commerce@vapeshop.ru">commerce@vapeshop.ru</a>
                                </div>
                            </div>
                            <div className="contacts__item">
                                <div className="contacts__item-head">
                                    <span className="contacts__item-title">Для прочих вопросов</span>
                                </div>
                                <div className="contacts__item-body">
                                    <a className="contacts__item-link" href="mailto:info@vapeshop.ru">info@vapeshop.ru</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contacts-block" id="shop-list">
                    <div className="contacts-block__head">
                        <h2 className="contacts-block__title">Наши магазины</h2>
                    </div>
                    <div className="contacts-block__map">
                        {map}
                    </div>
                    <div className="contacts__panel shop-list__wrapper">
                        <div className="shop-list">
                            {shopPoints.items.map((shop) =>
                                <div className="shop-list__block">
                                    <div className="shop-list__item shop-list__item__address">
                                        <div className="shop-list__item-title">Адрес:</div>
                                        <div className="shop-list__item-text">{shop.address}</div>
                                    </div>
                                    <div className="shop-list__item shop-list__item__work-time">
                                        <div className="shop-list__item-title">Время работы:</div>
                                        <div className="shop-list__item-text">{shop.workTime}</div>
                                    </div>
                                    <div className="shop-list__item shop-list__item__contact">
                                        <div className="shop-list__item-title">Телефон:</div>
                                        <div className="shop-list__item-text">{shop.phone}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
