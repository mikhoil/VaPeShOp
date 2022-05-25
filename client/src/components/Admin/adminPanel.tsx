import React from 'react';
import AddType from './addType';
import AddBrand from './addBrand';
import AddProduct from './addProduct';

export default function Addition(): JSX.Element {
    return <>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <AddType/>
            <AddBrand/>
            <AddProduct/>
        </div>
    </>;
}