import * as React from 'react';
import {useLocation} from "react-router-dom";
import {Breadcrumb, Collapse} from "antd";
import {Slider} from "antd";
import {Checkbox} from "antd";
import {useContext, useEffect, useState} from "react";
import {CatalogProductItem} from "../components/CatalogProductItem/catalogProductItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchProducts, fetchProductsBySortValue, fetchTypes} from "../http/productApi";
import {PagesPagination} from "../components/pagesPagination";

const {Panel} = Collapse

export const CatalogCardContent = observer(() => {
    const {product} = useContext(Context);

    const brandCheckboxOptions = ['VooPoo', 'Eleaf', 'Smoant', "GeekVape"];
    const puffCheckboxOptions = ["Свободная (DL)", "Тугая (MTL)"];
    const colorCheckboxOptions = ["Белый", "Черный", "Синий", "Красный"];

    const location = useLocation()
    const pathnameArr = location.pathname.split('/')
    const type = pathnameArr[pathnameArr.length - 1]

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchBrands().then(data => product.setBrands(data));
        fetchProducts(type, null, 1, product.limit).then(data => {
            product.setPage(1)
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, [type]);

    useEffect(() => {
        fetchProducts(type, null, product.page, product.limit).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, [product.page]);

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
                        product.products.map((data) => {
                            return <CatalogProductItem key={data.id} product={data}/>
                        })
                    }
                    <PagesPagination className="pages-pagination pages-pagination--bottom"/>
                </div>
            </div>
        </>
    )
})