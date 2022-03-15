import React from "react";
import {PRODUCT} from "./PRODUCT.js";

export function ProductCard(product: PRODUCT): JSX.Element {
    return (
        <div style={{
            backgroundColor: product.color,
            margin: 10,
            padding: 15,
            width: '33%',
            border: '5px dotted darkgreen',
            boxSizing: "border-box"
        }}>
            <h3
                style={{
                    fontSize: 25,
                    color: "brown"
                }}
            >{product.name}</h3>
            <img src={product.photo} alt="" width={200} height={200}/>
            <div style={{
                color: "darkorange",
                border: '5px solid darkorange',
                fontSize: 30,
                width: '30%',
                margin: "10px auto"
            }}>{product.price} Р/шт
            </div>
        </div>
    );
}