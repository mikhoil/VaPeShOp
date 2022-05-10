import React, {useEffect, useState} from 'react';
import vapeImg from "../static/resources/img/vape1.png";
import {CartItemType} from "./cart_item_type";
import CartItem from "./cart_item";
import {SubmitHandler, useForm} from "react-hook-form";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {MdOutlineClose} from "react-icons/md";
import {Button, Input} from "antd";
import cartProductsData from "../cartData";

type Inputs = {
    example: string,
    exampleRequired: string,
}

type Props = {
    cartItems: Array<CartItemType>
}

const OrderFormList = (props: Props) => {
    const [cartProducts, setCartProducts] = useState(Array<CartItemType>());

    useEffect(() => {
        setCartProducts(props.cartItems)
    }, [])

    /*useEffect(() => {
        console.log("order list level", cartProducts)
    }, [cartProducts]);*/

    const increase_amount = (id:string, amount: number): void => {
        let cartItem = cartProducts.find(x => x.id === id)
        if (cartItem) {
            cartItem.count++
            cartItem.totalPrice = cartItem.price * cartItem.count
        }
    };
    const decrease_amount = (id:string, amount: number): void => {
        let cartItem = cartProducts.find(x => x.id === id)
        if (cartItem) {
            cartItem.count = amount - +(amount > 1)
            cartItem.totalPrice = cartItem.price * cartItem.count
        }
    };

    const [cost, setCost] = useState(0);
    const increaseCost = (value: number, amount: number): void => setCost(value * amount);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data, "submit")
    };

    return (
        <form className="cart-order__form cart-order__form-list" onSubmit={handleSubmit(onSubmit)}>
            <div className="cart-order__form-items">
                {
                    cartProducts.map(({
                                                 id,
                                                 brand,
                                                 name,
                                                 photo,
                                                 price,
                                                 count,
                                                 totalPrice
                                             }: CartItemType, key: number): JSX.Element =>
                        <div className="cart-order__form-item" id={id.toString()} key={key}>
                            <div className="cart-order__form-item-cover">
                                <img src={require(`../static/resources/img/${photo}`)} alt={brand + ":" + name}/>
                            </div>
                            <div className="cart-order__form-item-info">
                                <div className="cart-order__form-item-info-block cart-order__form-item-other">
                                    <div className="cart-order__form-item-other-block">
                                        <span className="cart-order__form-item-other-title">Артикул:</span>
                                        <span className="cart-order__form-item-other-text">312312312</span>
                                    </div>
                                    <div className="cart-order__form-item-other-block">
                                        <span className="cart-order__form-item-other-title">Бренд:</span>
                                        <span className="cart-order__form-item-other-text">{brand}</span>
                                    </div>
                                </div>
                                <div className="cart-order__form-item-info-block">
                                    <div className="cart-order__form-item-title">{name}</div>
                                </div>
                            </div>
                            <div className="cart-order__form-item-count">
                                <div className="cart-order__form-item-count__btns">
                                    <button type="button"
                                            className="btn cart-order__form-item-count__btn cart-order__form-item-count__btn--left"
                                            onClick={() => {
                                                decrease_amount(id, count)
                                                increaseCost(price, count - +(count > 1));
                                            }}
                                    >
                                        <AiOutlineMinus/>
                                    </button>
                                    <div className="cart-order__form-item-count__text">{count}</div>
                                    <button type="button"
                                            className="btn cart-order__form-item-count__btn cart-order__form-item-count__btn--right"
                                            onClick={() => {
                                                increase_amount(id, count);
                                                increaseCost(price, count + 1);
                                            }}
                                    >
                                        <AiOutlinePlus/>
                                    </button>
                                </div>
                            </div>
                            <div className="cart-order__form-item-price">
                                <div className="cart-order__form-item-price-text">{totalPrice} Р</div>
                            </div>
                            <div className="cart-order__form-item-remove">
                                <button type="button" className="btn cart-order__form-item-remove__btn"
                                        onClick={() => {
                                            console.log("remove order item")
                                        }}
                                >
                                    <MdOutlineClose/>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </form>
    );
}

export default OrderFormList
