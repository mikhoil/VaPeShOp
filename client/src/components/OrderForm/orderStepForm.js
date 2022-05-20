import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {OrderFormList} from "./orderFormList";
import {OrderFormDelivery} from "./orderFormDelivery";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

export const OrderStepForm = observer(({updateKey, step}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const {cart} = useContext(Context)

    useEffect(() => {
        updateKey(currentStep.toString())
    }, [currentStep]);

    useEffect(() => {
        setCurrentStep(step)
    }, [step]);

    return (
        <>
            <div className="cart-order__block">
                {currentStep === 0 && (
                    <OrderFormList/>
                )}
                {currentStep === 1 && (
                    <OrderFormDelivery/>
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
                {currentStep < 1 &&
                    <button type="button" className="btn cart-order__form-btn cart-order__form-btn--next"
                            onClick={() => {
                                setCurrentStep(currentStep + 1)
                            }}
                            disabled={cart.cart.length === 0}
                    >
                        Далее
                    </button>
                }

            </div>
        </>
    );
})