import * as React from 'react';
import "../css/productsEdit.css"
import {Link} from "react-router-dom";
import {CATALOG_ROUTE, PRODUCT_EDIT_ROUTE, PRODUCT_ROUTE} from "../utils/constRoutes";
import {Button, Pagination, Input} from "antd";
import {BsArrowRightCircle, BsPlusCircle} from "react-icons/bs";
import {getAllProductsInAdminPage} from "../http/productApi";
import {useState, useEffect} from "react";

const { Search } = Input;

export const ProductsEdit = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const fetchProducts = () => {
        console.log("SEARCH")
        getAllProductsInAdminPage(currentPage, limit).then(({count, rows}) => {
            setProducts(rows);
            setTotalCount(count)
        })
    };

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    const limit = 8;
    let searchTimerId;

    const onChange = (value) => {
        clearTimeout(searchTimerId);
        searchTimerId = setTimeout(fetchProducts, 500)
    }

    return (
        <>
            <div className="products-edit">
                <h2 className="products-edit__title">Редактирование товаров</h2>
                <div className="products-edit__search">
                    <Search
                        placeholder="Поиск товара по имени, id, бренду или типу"
                        allowClear
                        size="large"
                        onChange={onChange}
                    />
                </div>
                <div className="products__items">
                    {products && products.map((product) =>
                        <div className="products__item" key={product.id}>
                            <div className="products__item__img">
                                <img src={product.img} alt={product.name}/>
                            </div>
                            <div className="products__item__title products-edit__item__title">
                                <span>{product.name}</span>
                            </div>
                            <div className="products__item__price">
                                <span>{product.price || 0} Р</span>
                            </div>
                            <div className="products__item__info-block">
                                <div className="products__item__info-block__title">ID товара</div>
                                <div className="products__item__info-block__text">{product.id}</div>
                            </div>
                            <div className="products__item__info-block">
                                <div className="products__item__info-block__title">Бренд</div>
                                <div className="products__item__info-block__text">{product.brand.name}</div>
                            </div>
                            <div className="products__item__info-block">
                                <div className="products__item__info-block__title">Тип</div>
                                <div className="products__item__info-block__text">{product.type.name}</div>
                            </div>
                            <div className="products__item__btns">
                                <Link to={PRODUCT_EDIT_ROUTE + "/" + product.id} className="btn btn-default products-edit__btn">
                                    Редактировать
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="products-pagination">
                    <Pagination defaultCurrent={1}
                                current={currentPage}
                                total={totalCount}
                                pageSize={limit}
                                hideOnSinglePage
                                showLessItems
                                showSizeChanger={false}
                                onChange={(page) => {
                                    setCurrentPage(page)
                                }}
                    />
                </div>
            </div>
        </>
    );
};