import * as React from 'react';
import {Link} from "react-router-dom";
import {CatalogCard} from "./catalogCard";
import {Breadcrumb, Collapse} from "antd";
import {Slider} from "antd";
import {Checkbox} from "antd";
import catalogCards from "../../catalogCards";
import {useEffect, useState} from "react";
import {ProductType} from "../CatalogProductItem/productType";
import {CatalogProductItem} from "../CatalogProductItem/catalogProductItem";
import catalogDevices from "../../catalogDevices";
import {Container} from "../Container/container";

const {Panel} = Collapse



type Props = {

};

export const CatalogCardContent = (props: Props) => {
    const [catalogProducts, setCatalogProducts] = useState(catalogDevices)

    const brandCheckboxOptions = ['VooPoo', 'Eleaf', 'Smoant', "GeekVape"];
    const puffCheckboxOptions = ["Свободная (DL)", "Тугая (MTL)"];
    const colorCheckboxOptions = ["Белый", "Черный", "Синий", "Красный"];

   /* useEffect(() => {
        setCatalogProducts(props.data)
    }, [props.data])*/

    return (
        <>
            <div className="section-info">
                <h2 className="section-info__title">Каталог</h2>
            </div>
            <div className="catalog__container catalog__products">
                <div className="filter">
                    <Collapse defaultActiveKey={["1", "2", "3", "4", "5"]} ghost>
                        <Panel className="filter__price" key="1" header="Цена">
                            <Slider
                                min={1200}
                                max={5000}
                                defaultValue={[1200, 5000]}
                                range
                            />
                        </Panel>
                        <Panel className="filter__accumulator" key="2" header="Ёмкость аккумулятора">
                            <Slider
                                min={520}
                                max={6000}
                                defaultValue={[520, 6000]}
                                range
                            />
                        </Panel>
                        <Panel className="filter__brands" key="3" header="Бренд">
                            <Checkbox.Group options={brandCheckboxOptions}>
                            </Checkbox.Group>
                        </Panel>
                        <Panel key="4" header="Тип затяжки">
                            <Checkbox.Group options={puffCheckboxOptions}>
                            </Checkbox.Group>
                        </Panel>
                        <Panel key="5" header="Цвет">
                            <Checkbox.Group options={colorCheckboxOptions}>
                            </Checkbox.Group>
                        </Panel>
                    </Collapse>
                </div>
                <div className="products__items catalog__items">
                    {
                        catalogProducts.map(({
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
                </div>
            </div>
        </>
    )
}