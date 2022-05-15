import * as React from 'react';
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {USER_PAGE_ROUTE} from "../utils/constRoutes";

export const Admin = () => {
    const {user} = useContext(Context)

    const navigate = useNavigate();
    useEffect(() => {
        if (user.user.role !== "ADMIN") {
            navigate(USER_PAGE_ROUTE)
        }
    }, [user])

    return (
        <div>
            Админ панель
        </div>
    );
};