import React, {useState} from "react";
import {Product} from "./product.js";
import Review from "./review";
import {Comment} from "./comment.js";
import vape1 from "../static/resources/img/vape1.png";
import {BsArrowRightCircle, BsPlusCircle, BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {Button} from "antd";

export default function ProductCard({name, price, photo, description, reviews, color}: Product): JSX.Element {
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
                <img src={photo} alt={name}/>
            </div>
            <div className="products__item__title">
                <span>{name}</span>
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
                <Button className="btn products__item__more-info-btn" ghost={true} icon={<BsArrowRightCircle className="icon--mg-right"></BsArrowRightCircle>}>Подробнее</Button>
                <Button className="btn products__item__add-btn" ghost={true} icon={<BsPlusCircle className="icon--mg-right"></BsPlusCircle>}>В корзину</Button>
            </div>
        </div>
        /*<div style={{
            backgroundColor: color,
            margin: 10,
            padding: 15,
            width: '35%',
            border: '5px dotted darkgreen',
            boxSizing: "border-box"
        }}>
            <h3
                style={{
                    fontSize: 25,
                    color: "brown"
                }}
            >{name}</h3>
            <img src={photo} alt="" width={'40%'} height={'20%'}/>
            <button style={{
                display: "block",
                color: "yellow",
                border: '5px solid yellowgreen',
                fontSize: '150%',
                width: '70%',
                margin: "10px auto",
                backgroundColor: '#057c20'
            }}
                    onClick={() => {

                    }}>В корзину за {price} &#8381;/шт
            </button>
            <h4 style={{
                color: 'blue'
            }}>Описание:</h4>
            <p
                style={{
                    color: 'darkblue',
                    textAlign: "justify"
                }}
            >{description}</p>
            <h4 style={{
                color: 'darkgreen',
                textAlign: 'left'
            }}>Отзывы:</h4>
            <div
                style={{
                    paddingBottom: 15
                }}
            >
                {
                    reviews.map(({author, text, mark}: Comment, key: number): JSX.Element =>
                        <Review
                            key={key}
                            author={author}
                            text={text}
                            mark={mark}
                        />
                    )
                }
            </div>
        </div>*/
    );
}