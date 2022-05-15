import * as React from 'react';
import {ProductType} from "../CatalogProductItem/productType";
import {useContext, useEffect, useState} from "react";
import {CatalogProductItem} from "../CatalogProductItem/catalogProductItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {toJS} from "mobx";

export const CatalogNew = observer(({data}) => {
    const {product} = useContext(Context);

    return (
        <>
            {data.map((item) =>
                <CatalogProductItem key={item.id} product={item}/>
            )}
        </>
    );
})