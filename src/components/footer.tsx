import React, {Component} from 'react';
import "./footer.css"
import {MdOutlineLocationOn} from "react-icons/md";
import {Link} from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer__row footer-main">
                        <div className="footer-main__menu">
                            <div className="footer-main__menu-block">
                                <div className="footer-main__menu-title">Каталог</div>
                                <div className="footer-main__menu-list">
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link" href="#">Электронные сигареты</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Жидкости</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Аксессуары</a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-main__menu-block">
                                <div className="footer-main__menu-title">Покупателям</div>
                                <div className="footer-main__menu-list">
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Доставка и оплата</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Оферта</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Помощь</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Гарантии</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Контакты</a>
                                    </div>
                                    <div className="footer-main__menu-item">
                                        <a className="footer-main__menu-link"  href="#">Отзывы</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-main__contact">
                            <div className="footer-main__contact-block footer-main__contact-block__address">
                                <div className="footer-main__contact-city">
                                    <MdOutlineLocationOn className="icon--mg-right"/>
                                    Екатеринбург
                                </div>
                                <div className="footer-main__contact-shop-list">
                                    <Link to="contacts#shop-list">Адреса магазинов</Link>
                                </div>
                            </div>
                            <div className="footer-main__contact-block footer-main__contact-block__communication">
                                <div className="footer-main__contact-phone">
                                    <a className="footer-main__contact-link" href="tel:88005553535">8 800 555 35 35</a>
                                </div>
                                <div className="footer-main__contact-time">
                                    <div className="footer-main__contact-time-title">Обработка онлайн заказов: </div>
                                    <div className="footer-main__contact-time-text">Пн-Вс: 09:00 - 18:00 (МСК)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__row footer-policy">
                        <div className="footer-policy__company">
                            <div className="footer-policy__site">
                                © 2022-2022, Vape Shop
                            </div>
                            <div className="footer-policy__owners">
                                Права на сайт и публикуемый материал, товарный знак принадлежат:
                                <br/>Жизневский Андрей
                                <br/>Ланских Михаил
                            </div>
                            <div className="footer-policy__nav">
                                <div className="footer-policy__nav-item">
                                    <a href="#">Политика в отношении обработки персональных данных</a>
                                </div>
                                <div className="footer-policy__nav-item">
                                    <a href="#">Оферта</a>
                                </div>
                                <div className="footer-policy__nav-item">
                                    <a href="#">Соглашение об использовании Cookie</a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-policy__law">
                            <div className="footer-policy__law-block">
                                <p>Доступ к сайту разрешен только лицам старше 18 лет, являющимся потребителями табака или иной никотиносодержащей продукции, которые в противном случае продолжат курить или употреблять иную никтотиносодержащую продукцию. Данный сайт не является рекламой, а служит лишь для предоставления достоверной информации о свойствах, характеристиках продукции и её наличии в магазинах сети. (п.1 и п.2 ст.10 Закона «О защите прав потребителей»). Дистанционная продажа и доставка никотиносодержащей продукции не осуществляется.</p>
                                <div className="footer-policy__law-icon">18+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;