// @flow
import * as React from 'react';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

import {CartItemType} from "./cart_item_type";
import OrderFormList from "./orderFormList";
import OrderFormDelivery from "./orderFormDelivery";
import OrderFormPayment from "./orderFormPayment";
import OrderFormComplete from "./orderFormComplete";

type Props = {
    cart: Array<CartItemType>
    step: number
    updateKey: (value: string) => void
    updateCart: (value: Array<CartItemType>) => void
};

const OrderStepForm = (props: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [cart, setCart] = useState(Array<CartItemType>())

    useEffect(() => {
        setCart(props.cart)
    }, [props.cart])

    useEffect(() => {
        props.updateKey(currentStep.toString())
    }, [currentStep]);

    useEffect(() => {
        setCurrentStep(props.step)
    }, [props.step]);

    useEffect(() => {
        console.log("step form level", cart)
    }, [cart]);


    return (
        <>
            <div className="cart-order__block">
                {currentStep === 0 && (
                    <OrderFormList cartItems={cart} updateCartItems={props.updateCart}/>
                )}
                {currentStep === 1 && (
                    <OrderFormDelivery/>
                )}
                {currentStep === 2 && (
                    <OrderFormPayment/>
                )}
                {currentStep === 3 && (
                    <OrderFormComplete/>
                )}
            </div>
            <div className="cart-order__form-btns">
                {currentStep > 0 &&
                    <button type="button" className="btn cart-order__form-btn cart-order__form-btn--prev"
                            onClick={() => {
                                setCurrentStep(currentStep - 1)
                            }}
                    >
                        Назад
                    </button>
                }
                {currentStep < 3 &&
                    <button type="button" className="btn cart-order__form-btn cart-order__form-btn--next"
                            onClick={() => {
                                setCurrentStep(currentStep + 1)
                            }}
                    >
                        Далее
                    </button>
                }

            </div>
        </>
    );
};

export default OrderStepForm;