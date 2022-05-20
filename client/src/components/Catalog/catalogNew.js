import * as React from 'react';
import {CatalogProductItem} from "../CatalogProductItem/catalogProductItem";
import {observer} from "mobx-react-lite";

export const CatalogNew = observer(({data}) => {
    return (
        <>
            {data.map((item) =>
                <CatalogProductItem key={item.id} product={item}/>
            )}
        </>
    );
})