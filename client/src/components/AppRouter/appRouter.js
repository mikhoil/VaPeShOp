import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../../routes"
import {Footer} from "../Footer/footer";
import {Container} from "../Container/container";
import {useContext} from "react";
import {Context} from "../../index";

export const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <div className="app__wrapper">
            <Container>
                <Routes>
                    {user.isAuth && adminRoutes.map( ({path, Component}) => {
                        return <Route key={path} path={path} element={Component}/>
                    })}
                    {user.isAuth && authRoutes.map( ({path, Component}) => {
                        return <Route key={path} path={path} element={Component}/>
                    })}
                    {publicRoutes.map( ({path, Component}) => {
                        return <Route key={path} path={path} element={Component}/>
                    })}
                </Routes>
            </Container>
            <Footer/>
        </div>
    );
};