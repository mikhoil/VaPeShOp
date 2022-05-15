// @flow
import * as React from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {addProductToCart, addReview, checkRating, fetchOneProduct} from "../http/productApi";

export const Product = observer(() => {
    const {user, cart} = useContext(Context);
    const [product, setProduct] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setIsAccessRating] = useState(false);
    const [reviewText, setReviewText] = useState('')
    const reviewWords = ["отзыв", "отзыва", "отзывов"]
    const {id} = useParams();
    console.log(id)

    useEffect( () => {
        fetchOneProduct(id).then(data => setProduct(data));
        /*if(user.isAuth) {
            checkRating({productId: id}).then(res => setIsAccessRating(res.allow));
        }*/
    },[id, resRate]);

    /*useEffect(() => {
        setReviewText(getReviewText(product.reviews.length, reviewWords));
    }, [product])*/

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

    /*const ratingChanged = (rate) => {
        addReview({
            rate,
            deviceId: id
        }).then(res => {
            setResRate(res);
        });
    };*/

    function getReviewText(n, text_forms) {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) { return n + " " + text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return n + " " + text_forms[1]; }
        if (n1 === 1) { return n + " " + text_forms[0]; }
        return n + " " + text_forms[2];
    }

    return (
        <div>

        </div>
    );
})