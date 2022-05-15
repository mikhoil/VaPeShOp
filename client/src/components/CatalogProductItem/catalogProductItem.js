import React, {useContext, useEffect, useState} from "react";
import {CART_ROUTE, CATALOG_ROUTE, PRODUCT_ROUTE} from "../../utils/constRoutes";
import {BsArrowRightCircle, BsPlusCircle, BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {Button} from "antd";
import {Link, useHistory, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {addProductToCart, fetchOneProduct} from "../../http/productApi";
import "../../css/catalog.css"

export const CatalogProductItem = observer(({product}) =>  {
    const {user, cart} = useContext(Context);
    const [reviewText, setReviewText] = useState('')
    const reviewWords = ["отзыв", "отзыва", "отзывов"]
    const id = product.id;

    useEffect(() => {
        setReviewText(getReviewText(product.reviews.length, reviewWords));
    }, [product])

    const isProductInCart = () => {
        const findProduct = cart.cart.findIndex(item => Number(item.id) === Number(product.id));
        return findProduct < 0;
    }

    const addProductInCart = (product) => {
        if(user.isAuth) {
            addProductToCart(product).then(() => cart.setCart(product, true))
        } else {
            cart.setCart(product);
        }
    }

    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(product.rating)) {
            stars.push(<BsStarFill key={i}/>);
        } else if (i + 0.5 < product.rating) {
            stars.push(<BsStarHalf key={i}/>);
        } else {
            stars.push(<BsStar key={i}/>);
        }
    }

    function getReviewText(n, text_forms) {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) { return n + " " + text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return n + " " + text_forms[1]; }
        if (n1 === 1) { return n + " " + text_forms[0]; }
        return n + " " + text_forms[2];
    }

    return (
        <div className="products__item">
            <div className="products__item__img">
                <img src={product.img} alt={product.name}/>
            </div>
            <div className="products__item__title">
                <span>{product.name}</span>
            </div>
            <div className="products__item__rating">
                <div className="products__item__stars">
                    {
                        stars.map(n => {
                            return n;
                        })
                    }
                </div>
                <div className="products__item__review-count">
                    <span>{reviewText}</span>
                </div>
            </div>
            <div className="products__item__price">
                <span>{product?.price || 0} Р</span>
            </div>
            <div className="products__item__btns">
                <Link to={CATALOG_ROUTE + "/" + product.type.id + PRODUCT_ROUTE + "/" + product.id} className="btn products__item__more-info-btn">
                    <Button className="btn products__item__more-info-btn"
                            ghost={true}
                            icon={<BsArrowRightCircle className="icon--mg-right"/>}
                    >Подробнее
                    </Button>
                </Link>
                { isProductInCart() ?
                    <Button className="btn products__item__add-btn"
                            ghost={true}
                            icon={<BsPlusCircle className="icon--mg-right"/>}
                            onClick={() => addProductInCart(product)}
                    >В корзину
                    </Button>
                    :
                    <Button className="btn products__item__add-btn"
                            ghost={true} disabled
                            icon={<BsPlusCircle className="icon--mg-right"/>}
                    >Добавлен
                    </Button>
                }
            </div>
        </div>
    );
})

