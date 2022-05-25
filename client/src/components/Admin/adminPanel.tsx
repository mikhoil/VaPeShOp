import React from 'react';
import AddType from './addType';
import AddBrand from './addBrand';
import AddProduct from './addProduct';

export default function AdminPanel(): JSX.Element {
    return <>
        <div>
            <AddType/>
            <AddBrand/>
            <AddProduct/>
        </div>
    </>;
}