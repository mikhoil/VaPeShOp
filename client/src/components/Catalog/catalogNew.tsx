// @flow 
import * as React from 'react';
import {ProductType} from "../CatalogProductItem/productType";
import {useEffect, useState} from "react";
import {CatalogProductItem} from "../CatalogProductItem/catalogProductItem";

type Props = {
    catalogData: Array<ProductType>
};
export const CatalogNew = (props: Props) => {
    const [catalogItems, setCatalogItems] = useState(Array<ProductType>())

    useEffect(() => {
        setCatalogItems(props.catalogData)
    }, [props.catalogData])

    return (
        <>
            {
                catalogItems.map(({
                                         id,
                                         brand,
                                         name,
                                         price,
                                         photo,
                                         description,
                                         reviews
                                     }: ProductType, key: number): JSX.Element =>
                    <CatalogProductItem
                        id={id}
                        key={key}
                        brand={brand}
                        name={name}
                        price={price}
                        photo={photo}
                        description={description}
                        reviews={reviews}
                    />
                )
            }
        </>
    );
};