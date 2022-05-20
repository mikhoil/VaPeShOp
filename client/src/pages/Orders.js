import * as React from 'react';
import "../css/orders.css"
import {useEffect, useState} from "react";
import {fetchOrders} from "../http/ordersApi";
import {Collapse, Spin, Radio, Space} from "antd";
import {OrderItem} from "../components/OrderItem/orderItem";

const {Panel} = Collapse

export const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filterValue, setFilterValue] = useState(-1);
    const [isRerender, setIsRerender] = useState(false);

    const limit = 12;
    const pageCount = Math.ceil(Number(count) / limit);

    useEffect(() => {
        fetchOrders({limit, page: 1}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
        })
    }, []);

    useEffect(() => {
        if (filterValue >= 0) {
            fetchOrders({limit, page: 1, isComplete: filterValue}).then(data => {
                setOrders(data);
                setCount(data.count);
                setCurrentPage(1);
            })
        } else {
            fetchOrders({limit, page: 1}).then(data => {
                setOrders(data);
                setCount(data.count);
                setCurrentPage(1);
            })
        }
    }, [filterValue]);

    useEffect(() => {
        fetchOrders({limit, page: currentPage}).then(data => {
            setOrders(data);
        })
    }, [currentPage]);

     useEffect(() => {
         fetchOrders({limit, page: currentPage}).then(data => {
             setOrders(data);
             setCount(data.count);
             setCurrentPage(1);
         })
     }, [isRerender]);

    const updateRender = () => {
        setIsRerender(!isRerender);
    }

    const onFilterChange = (e) => {
        setFilterValue(e.target.value)
    }

    if (loading) {
        return (
            <div className="loader">
                <Spin/>
            </div>
        )
    }

    console.log(pageCount, currentPage, limit)

    return (
        <div className="orders">
            <div className="filter orders__filter">
                <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
                    <Panel className="filter__price" key="1" header="Статус заказа">
                        <Radio.Group buttonStyle="solid" value={filterValue} onChange={onFilterChange}>
                            <Space direction="vertical">
                                <Radio value={-1}>Все заказы</Radio>
                                <Radio value={0}>Не завершенные</Radio>
                                <Radio value={1}>Завершенные</Radio>
                            </Space>
                        </Radio.Group>
                    </Panel>
                </Collapse>
            </div>
            {orders.count === 0 &&
            <div className="orders__title">Страница заказов пуста</div>
            }
            {orders.count > 0 &&
            <div className="orders__content">
                <div className="orders__title">Список всех заказов</div>
                <div className="orders__list">
                    {orders.rows?.map(({id, isComplete, phoneNumber, createdAt, updatedAt, userId}) =>
                        <OrderItem
                            key={id}
                            id={id}
                            isComplete={isComplete}
                            phoneNumber={phoneNumber}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            userId={userId}
                            updateRender={updateRender}/>
                    )}
                </div>
            </div>
            }
        </div>
    );
};