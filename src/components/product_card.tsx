import React from "react";
import {Product} from "./product.js";
import Review from "./review";
import {Comment} from "./comment.js";

export default function ProductCard({name, price, photo, description, reviews, color}: Product): JSX.Element {
    return (
        <div style={{
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
        </div>
    );
}