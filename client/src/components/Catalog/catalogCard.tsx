import React from "react";

type Props = {
    type: string
    img: string
}

export const CatalogCard = (props: Props) =>  {
    return (
        <div className="products__item">
            <div className="products__item__img">
                <img src={'http://localhost:3001/' + props.img} alt={props.type}/>
            </div>
            <div className="products__item__title">
                <span>{props.type}</span>
            </div>
        </div>
    );
}
