import React, {useEffect, useState} from "react";
import "./cart.css";
import {CartItemType} from "./cart_item_type.js";
import CartItem from "./cart_item";
import { Tabs } from "antd";
import classNames from "classnames";
import {MdOutlineLocalShipping, MdList, MdPayment, MdCheck} from "react-icons/md";
import OrderStepForm from "./orderStepForm";

import vapeImg from "../static/resources/img/vape1.png";
import cartProductsData from "../cartData";
import {OrderFormListItems} from "./orderFormListItems";

const { TabPane } = Tabs;

export default function Cart(): JSX.Element {
    const [cartProducts, setCartProducts] = useState(cartProductsData);

    const [key, setKey] = useState("0");

    const [deliveryOpen, setDeliveryOpen] = useState(false)
    const [paymentOpen, setPaymentOpen] = useState(false)
    const [completeOpen, setCompleteOpen] = useState(false)

    const updateKey = (value: string) => {
        setKey(value)
    }

    const updateCart = (newCartItems: Array<CartItemType>) => {
        setCartProducts([...cartProducts])
    }

    useEffect(() => {
        if (key === "1") {
            setDeliveryOpen(true)
        }
        if (key === "2") {
            setPaymentOpen(true)
        }
        if (key === "3") {
            setCompleteOpen(true)
        }
    }, [key])

    return (
        <>
            <section className="cart">
                <div className="cart-tabs">
                    <Tabs activeKey={key}
                        onTabClick={(key) => {
                            setKey(key)
                        }}
                        >
                        <TabPane tab={
                            <span className={classNames({"tab__complete": +key > 0})}>
                                <MdList/>
                                01. Товары
                            </span>
                        } key="0">
                        </TabPane>
                        <TabPane tab={
                            <span className={classNames({"tab__complete": +key > 1})}>
                                <MdOutlineLocalShipping/>
                                02. Доставка
                            </span>
                        } key="1" disabled={!deliveryOpen}>
                        </TabPane>
                        <TabPane tab={
                            <span className={classNames({"tab__complete": +key > 2})}>
                                <MdPayment/>
                                03. Оплата
                            </span>
                        } key="2" disabled={!paymentOpen}>
                        </TabPane>
                        <TabPane tab={
                            <span className={classNames({"tab__complete": +key > 3})}>
                                <MdCheck/>
                                04. Готово
                            </span>
                        } key="3" disabled={!completeOpen}>
                        </TabPane>
                    </Tabs>
                </div>
                <div className="cart-wrapper">
                    <div className="cart-order">
                        <OrderStepForm cart={cartProducts} updateKey={updateKey} updateCart={updateCart} step={+key}/>
                    </div>
                    <div className="cart-items">
                        <div className="cart-items__head">
                            <div className="cart-items__head-title">
                                Товары в корзине
                            </div>
                        </div>
                        <div className="cart-items__body">
                            <div className="cart-items__list">
                                <OrderFormListItems items={cartProducts}/>
                            </div>
                        </div>
                        <div className="cart-items__footer">
                            <div className="cart-items__footer-block">
                                Всего:
                            </div>
                            <div className="cart-items__footer-block">
                                {cartProducts.map(({totalPrice}: CartItemType, key: number) => {
                                    return totalPrice
                                }).reduce((prev, current) => {
                                    return prev + current
                                })} Р
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}