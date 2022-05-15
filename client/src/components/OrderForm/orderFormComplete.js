import React from 'react';
import 'react-phone-number-input/style.css'
import {useForm} from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"

export const OrderFormComplete = () => {
    return (
        <div className="cart-order__form-wrapper">
            <form className="cart-order__form">
            </form>
        </div>
    );
};