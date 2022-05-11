import React, {useState} from "react";
import {ProductType} from "../CatalogProductItem/productType.js";
import {BsArrowRightCircle, BsPlusCircle, BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {Button} from "antd";

type Props = {
    type: string
    img: string
}

export const CatalogCard = (props: Props) =>  {
    return (
        <div className="products__item">
            <div className="products__item__img">
                <img src={`/resources/img/${props.img}`} alt={props.type}/>
            </div>
            <div className="products__item__title">
                <span>{props.type}</span>
            </div>
        </div>
    );
}
