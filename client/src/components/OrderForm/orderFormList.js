import React, {useContext} from 'react';
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {MdOutlineClose} from "react-icons/md";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

export const OrderFormList = observer(() => {
    const {cart, user} = useContext(Context)

    if (cart.cart.length === 0) {
        return (
            <div className="order-empty">Здесь пока пусто</div>
        )
    }

    return (
        <form className="cart-order__form cart-order__form-list">
            <div className="cart-order__form-items">
                {
                    cart.cart.map((cartItem) =>
                        <div className="cart-order__form-item" id={cartItem.id.toString()} key={cartItem.id}>
                            <div className="cart-order__form-item-cover">
                                <img src={cartItem.img} alt={cartItem.name}/>
                            </div>
                            <div className="cart-order__form-item-info">
                                <div className="cart-order__form-item-info-block cart-order__form-item-other">
                                    <div className="cart-order__form-item-other-block">
                                        <span className="cart-order__form-item-other-title">Артикул:</span>
                                        <span className="cart-order__form-item-other-text">{cartItem.id}</span>
                                    </div>
                                    <div className="cart-order__form-item-other-block">
                                        <span className="cart-order__form-item-other-title">Бренд:</span>
                                        <span className="cart-order__form-item-other-text">{cartItem.brand.name}</span>
                                    </div>
                                </div>
                                <div className="cart-order__form-item-info-block">
                                    <div className="cart-order__form-item-title">{cartItem.name}</div>
                                </div>
                            </div>
                            <div className="cart-order__form-item-count">
                                <div className="cart-order__form-item-count__btns">
                                    <button type="button"
                                            className="btn cart-order__form-item-count__btn cart-order__form-item-count__btn--left"
                                            onClick={() => cart.setCountProduct(cartItem.id, "-")}
                                    >
                                        <AiOutlineMinus/>
                                    </button>
                                    <div className="cart-order__form-item-count__text">{cartItem.count}</div>
                                    <button type="button"
                                            className="btn cart-order__form-item-count__btn cart-order__form-item-count__btn--right"
                                            onClick={() => cart.setCountProduct(cartItem.id, "+")}
                                    >
                                        <AiOutlinePlus/>
                                    </button>
                                </div>
                            </div>
                            <div className="cart-order__form-item-price">
                                <div className="cart-order__form-item-price-text">{cartItem.price * cartItem.count} Р</div>
                            </div>
                            <div className="cart-order__form-item-remove">
                                <button type="button" className="btn cart-order__form-item-remove__btn"
                                        onClick={() => cart.setDeleteCartItem(cartItem, user.isAuth)}
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
})
