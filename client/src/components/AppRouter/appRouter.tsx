// @flow 
import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../routes"
import {Footer} from "../Footer/footer";
import {Container} from "../Container/container";

type Props = {
    
};

export const AppRouter = (props: Props) => {
    const isAuth = false
    return (
        <div className="app__wrapper">
            <Routes>
                {isAuth && authRoutes.map(({path, component}) =>
                    <Route path={path} element={component}/>
                )}
                {publicRoutes.map(({path, component}) =>
                    <Route path={path} element={component}/>
                )}
            </Routes>
            <Footer/>
        </div>
    );
};