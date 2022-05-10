import React, {useState} from "react";
import './catalog.css'
import {ProductType} from "../CatalogCard/productType";
import {Breadcrumb, Collapse} from "antd";
import {Slider} from "antd";
import {Checkbox} from "antd";

import catalogData from "../../catalogData";

import {Link, useLocation} from "react-router-dom";
import {CatalogCard} from "../CatalogCard/catalogCard";

const {Panel} = Collapse;

export const Catalog = () => {
    const [catalogProducts, setCatalogProducts] = useState(catalogData);

    const brandCheckboxOptions = ['VooPoo', 'Eleaf', 'Smoant', "GeekVape"];
    const puffCheckboxOptions = ["Свободная (DL)", "Тугая (MTL)"];
    const colorCheckboxOptions = ["Белый", "Черный", "Синий", "Красный"];

    return (
        <>
            <section className="catalog">
                <div className="section-info">
                    <h2 className="section-info__title">Каталог</h2>
                </div>
                <div className="catalog__container">
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
                                <CatalogCard
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
            </section>
        </>
    );
}