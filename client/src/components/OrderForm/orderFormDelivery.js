import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import {isValidPhoneNumber} from "react-phone-number-input";
import {createOrder} from "../../http/ordersApi";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE, MAIN_ROUTE} from "../../utils/constRoutes";

export const OrderFormDelivery = () => {
    const {cart, user} = useContext(Context);
    const navigate = useNavigate();
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data, "submit")
        let orderData = {
            cart: cart.cart,
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            email: data.email,
            country: data.country,
            region: data.region,
            city: data.city,
            postalCode: data.postalCode,
            address: data.address,
        }

        if (user.isAuth) {
            orderData.isAuth = true
        }

        createOrder(orderData).then(data => {
            console.log(data)
            cart.resetCart();
            navigate(MAIN_ROUTE)
        });
    };

    return (
        <div className="cart-order__form-wrapper">
            <div className="cart-order__form-title">Контактные данные</div>
            <form className="cart-order__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="cart-order__form-fields">
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="ФИО" autoComplete="name"
                               {...register("fullName", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <PhoneInputWithCountry
                            international
                            countryCallingCodeEditable={false}
                            name="phoneNumber"
                            defaultCountry="RU"
                            control={control}
                            rules={{ required: true, validate: isValidPhoneNumber, maxLength: 12 }}
                        />
                    </div>
                    <div className="cart-order__form-field">
                        <input type="email" placeholder="Email" autoComplete="email"
                               {...register("email", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="Страна" autoComplete="country-name"
                               {...register("country", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="Регион" autoComplete="address-level1"
                               {...register("region", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="Город" autoComplete="address-level2"
                               {...register("city", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="Индекс" autoComplete="postal-code"
                               {...register("postalCode", {
                                   required: true
                               })}/>
                    </div>
                    <div className="cart-order__form-field">
                        <input type="text" placeholder="Адрес" autoComplete="street-address"
                               {...register("address", {
                                   required: true
                               })}/>
                    </div>
                </div>
                <div className="cart-order__form-submit">
                    <button type="submit" className="btn cart-order__form-btn cart-order__form-btn--next">Оформить заказ</button>
                </div>
            </form>
        </div>
    );
};