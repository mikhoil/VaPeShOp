// @flow 
import * as React from 'react';
import '../css/auth.css'
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USER_PAGE_ROUTE} from "../utils/constRoutes";
import {useForm} from "react-hook-form";
import {login, registration} from "../http/userApi";

export const Auth = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            let data;
            console.log(formData)
            if(isLogin) {
                data = await login(formData.email, formData.password);
            } else {
                data = await registration(formData.email, formData.password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(USER_PAGE_ROUTE)
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    useEffect(() => {
        if (user.isAuth) {
            navigate(USER_PAGE_ROUTE)
        }
    }, [])

    return (
        <div className="auth">
            <div className="auth-block">
                <p className="auth-block__title">{isLogin ? "Авторизация" : "Регистрация"}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-fields">
                        <input type="email" {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
                        })}/>
                        <input type="password" {...register("password", {
                            required: true
                        })}/>
                    </div>
                    <div className="form-bottom-bar">
                        <div className="form-bottom-bar__text">
                            {isLogin ?
                                <div>
                                    Ещё нет аккаунта? <Link className="form-link" to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</Link>
                                </div>
                                :
                                <div>
                                    Уже есть аккаунт? <Link className="form-link" to={LOGIN_ROUTE}>Авторизуйтесь!</Link>
                                </div>
                            }
                        </div>
                        <button type="submit" className="btn btn-default btn-primary">
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};