import React, {useState} from "react";
import {ProductCard} from "./product_card";


export function Catalog(): JSX.Element {
    const [state, setState] = useState();
    return (
        <>
            <ProductCard
                id={1}
                name={'Eleaf iJust 3 Kit 3000 mah with Ello Duro'}
                price={3300}
                photo={'https://babylonvape.ru/upload/iblock/9ba/9ba655ecba32f57b98a5d01a98949b68.jpg'}
                rating={4}
                reviews={['Класс', 'Супер', 'Восхитительно', 'Крутяк', 'Кринжанул']}
                color={'lightgreen'}
            />
        </>
    );
}