import React, {useState} from "react";
import {ProductType} from "./productType";
import {BsArrowRightCircle, BsPlusCircle, BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {Button} from "antd";
import {Link} from "react-router-dom";

type Props = {

};

export const CatalogProductItem = ({id, brand, name, price, photo, description, reviews}: ProductType) =>  {
    const [productMark, setProductMark] = useState(0);

    const mark = reviews.reduce((sum, current) => {
        return sum + current.mark;
    }, 0);
    const avgMark = +(mark / reviews.length).toFixed(1);

    let stars: Array<JSX.Element> = [];

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(avgMark)) {
            stars.push(<BsStarFill key={i}></BsStarFill>);
        }
        else if (i + 0.5 < avgMark) {
            stars.push(<BsStarHalf key={i}></BsStarHalf>);
        } else {
            stars.push(<BsStar key={i}></BsStar>);
        }
    }

    const reviewWords = ["отзыв", "отзыва", "отзывов"];
    const reviewText = getReviewText(reviews.length, reviewWords);

    function getReviewText(n: number, text_forms: Array<string>) {
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) { return n + " " + text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return n + " " + text_forms[1]; }
        if (n1 == 1) { return n + " " + text_forms[0]; }
        return n + " " + text_forms[2];
    }

    return (
        <div className="products__item">
            <div className="products__item__img">
                <img src={`/resources/img/${photo}`} alt={name}/>
            </div>
            <div className="products__item__title">
                <span>{brand} {name}</span>
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
                <span>{price} Р</span>
            </div>
            <div className="products__item__btns">
                <Link to={window.location.pathname + "/" + id} className="btn">
                    <Button className="btn products__item__more-info-btn" ghost={true} icon={<BsArrowRightCircle className="icon--mg-right"></BsArrowRightCircle>}>Подробнее</Button>
                </Link>
                <Button className="btn products__item__add-btn" ghost={true} icon={<BsPlusCircle className="icon--mg-right"></BsPlusCircle>}>В корзину</Button>
            </div>
        </div>
    );
}

