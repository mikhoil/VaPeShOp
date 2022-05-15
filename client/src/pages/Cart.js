// @flow
import * as React from 'react';
import "../css/cart.css"
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {CartItemType} from "../components/CartItem/cartItemType";
import {Tabs} from "antd";
import classNames from "classnames";
import {MdCheck, MdList, MdOutlineLocalShipping, MdPayment} from "react-icons/md";
import {OrderStepForm} from "../components/OrderForm/orderStepForm";
import {CartItems} from "../components/Cart/cartItems";

const { TabPane } = Tabs;

export const Cart = observer(() => {
    const {cart} = useContext(Context)

    const [key, setKey] = useState("0");
    const [deliveryOpen, setDeliveryOpen] = useState(false)
    const [paymentOpen, setPaymentOpen] = useState(false)
    const [completeOpen, setCompleteOpen] = useState(false)

    const updateKey = (value) => {
        setKey(value)
    }

    useEffect(() => {
        if (key === "0") {
            if (cart.cart.length === 0) {
                setDeliveryOpen(false)
                setPaymentOpen(false)
                setCompleteOpen(false)
            }
        }
        if (key === "1") {
            if (cart.cart.length > 0)
                setDeliveryOpen(true)
            else
                setDeliveryOpen(false)
        }
        /*if (key === "2") {
            if (cart.cart.length > 0)
                setPaymentOpen(true)
            else
                setPaymentOpen(false)
        }
        if (key === "3") {
            if (cart.cart.length > 0)
                setCompleteOpen(true)
            else
                setCompleteOpen(false)
        }*/
    }, [key, cart.cart])

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
                        {/*<TabPane tab={
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
                        </TabPane>*/}
                    </Tabs>
                </div>
                <div className="cart-wrapper">
                    <div className="cart-order">
                        <OrderStepForm updateKey={updateKey} step={+key}/>
                    </div>
                    <div className="cart-items">
                        <div className="cart-items__head">
                            <div className="cart-items__head-title">
                                Товары в корзине
                            </div>
                        </div>
                        <div className="cart-items__body">
                            <div className="cart-items__list">
                                <CartItems/>
                            </div>
                        </div>
                        <div className="cart-items__footer">
                            <div className="cart-items__footer-block">
                                Всего:
                            </div>
                            <div className="cart-items__footer-block">
                                {cart.price} Р
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
})