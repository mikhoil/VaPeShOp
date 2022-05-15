import * as React from 'react';
import "../css/userPage.css"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, MAIN_ROUTE} from "../utils/constRoutes";

export const UserPage = observer(() => {
    const {user, cart} = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        cart.resetCart();
        navigate(MAIN_ROUTE)
    }

    return (
        <div className="user-page">
            <div className="user-info">
                <div className="user-info__block">
                    <div className="user-info__role-title">
                        Роль:
                    </div>
                    <div className="user-info__role-description">
                        {user.user.role === "ADMIN" ? "Администратор" : "Пользователь"}
                    </div>
                </div>
                <div className="user-info__block">
                    <div className="user-info__email-title">
                        Почта:
                    </div>
                    <div className="user-info__email-description">
                        {user.user.email}
                    </div>
                </div>
            </div>
            <div className="user-controls">
                {user.user.role === "ADMIN" &&
                <div className="user-controls__block">
                    <button type="button"
                            className="btn btn-default"
                            onClick={() => {
                                navigate(ADMIN_ROUTE)
                            }}>
                        Админ панель
                    </button>
                </div>
                }
                <div className="user-controls__block">
                    <button type="button"
                            className="btn btn-default"
                            onClick={() => {
                                logout()
                            }}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
})