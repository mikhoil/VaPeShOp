import * as React from 'react';
import '../css/admin.css';
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {Link, useNavigate} from "react-router-dom";
import {ORDERS_ROUTE, PRODUCTS_CONTROL_ROUTE, USER_PAGE_ROUTE} from "../utils/constRoutes";

export const Admin = () => {
    const {user} = useContext(Context)

    const navigate = useNavigate();
    useEffect(() => {
        if (user.user.role !== "ADMIN") {
            navigate(USER_PAGE_ROUTE)
        }
    }, [user])

    return (
        <div className="admin-panel">
            <div className="admin-panel__title">Доступные функции:</div>
            <div className="admin-panel__controls">
                <Link to={ORDERS_ROUTE} className="btn btn-default">Управление заказами</Link>
                <Link to={PRODUCTS_CONTROL_ROUTE} className="btn btn-default">Управление продуктами</Link>
            </div>
        </div>
    );
};