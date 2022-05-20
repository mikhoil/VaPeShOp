// @flow
import * as React from 'react';
import {ORDERS_ROUTE} from "../../utils/constRoutes";
import {Link} from "react-router-dom";
import {fetchChangeOrderStatus, fetchDeleteOrder} from "../../http/ordersApi";

export const OrderItem = ({id, isComplete, phoneNumber, createdAt, updatedAt, userId, updateRender}) => {
    const formatDate = (time) => {
        const date = new Date(Date.parse(time));
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("ru-RU", options);
    }

    const deleteOrder = () => {
        fetchDeleteOrder({id}).then(() => {
            setTimeout(() => updateRender(), 10);
        })
    }

    const changeOrderStatus = () => {
        fetchChangeOrderStatus({isComplete: !isComplete, id}).then(() => {
            setTimeout(() => updateRender(), 10);
        })
    }

    return (
        <div className="orders__item">
            <div className="orders__item-id">
                <Link to={ORDERS_ROUTE + `/${id}`}>Заказ №{id}</Link>
            </div>
            <div className="orders__item-block">
                <div className="orders__item-block__title">Номер телефона:</div>
                <div className="orders__item-block__text"><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></div>
            </div>
            <div className="orders__item-block">
                <div className="orders__item-block__title">Дата создания заказа:</div>
                <div className="orders__item-block__text">{formatDate(createdAt)}</div>
            </div>
            {isComplete &&
            <div className="orders__item-block">
                <div className="orders__item-block__title">Дата завершения заказа:</div>
                <div className="orders__item-block__text">{formatDate(updatedAt)}</div>
            </div>
            }
            <div className="orders__item-block">
                <div className="orders__item-block__title">Статус покупателя:</div>
                <div className="orders__item-block__text">{userId ? "Зарегистрирован" : "Гость"}</div>
            </div>
            <div className="orders__item-block">
                <div className="orders__item-block__title">Статус заказа:</div>
                <div className="orders__item-block__text">{isComplete ? "Завершён" : "Не завершён"}</div>
            </div>
            <div className="orders__item-block orders__item-btns">
                <Link to={ORDERS_ROUTE + `/${id}`} className="btn btn-default orders__item-btn">Подробнее о заказе</Link>
                <button type="button" className="btn btn-default orders__item-btn"
                    onClick={() => {
                        changeOrderStatus()
                    }}
                >Изменить статус заказа</button>
                <button type="button" className="btn btn-default orders__item-btn orders__item-btn--delete"
                    onClick={() => {
                        deleteOrder()
                    }}
                >Удалить заказ</button>
            </div>
        </div>
    );
};