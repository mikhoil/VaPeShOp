import React, {useRef} from 'react';
import "./contacts.css";

import {Link} from "react-router-dom";
import {YMaps, Map, Placemark, FullscreenControl, SearchControl, ZoomControl} from "react-yandex-maps";

export default function Contacts(): JSX.Element {
    const shopPoints = {
        items: [
            {
                center: [56.835111, 60.595669],
            },
            {
                center: [56.840398, 60.645968],
            },
            {
                center: [56.793170, 60.574257],
            },
            {
                center: [56.807611, 60.615550],
            },
            {
                center: [56.794456, 60.633584],
            },
            {
                center: [56.902926, 60.612510],
            }
        ]
    }

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
            <SearchControl/>
            {shopPoints.items.map((coordinates, index) => {
                return <Placemark key={index} geometry={coordinates.center}/>
            })}
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
        <div className="container">
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
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">ул. Вайнера, д. 9а</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">ул. Крестинского, д. 59 к.1</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">пр. Космонавтов, д. 45А</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">ул. Щорса, д. 53</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">ул. Гагарина, д. 22</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                            <div className="shop-list__block">
                                <div className="shop-list__item shop-list__item__address">
                                    <div className="shop-list__item-title">Адрес:</div>
                                    <div className="shop-list__item-text">ул. Амундсена, д. 74</div>
                                </div>
                                <div className="shop-list__item shop-list__item__work-time">
                                    <div className="shop-list__item-title">Время работы:</div>
                                    <div className="shop-list__item-text">Ежедневно, 10:00 - 22:00</div>
                                </div>
                                <div className="shop-list__item shop-list__item__contact">
                                    <div className="shop-list__item-title">Телефон:</div>
                                    <div className="shop-list__item-text">+7 (999) 999 99 99</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
