import React from 'react';
import './App.css';
import {Logo} from "./components/logo";
import {NavBar} from "./components/navbar";
import {Link, Route, Routes} from "react-router-dom";
import Cart from './components/cart';
import Footer from "./components/footer";

function App(): JSX.Element {
    return (
        <div className="app__wrapper">
            <div className="app app__content container container__pd-top">
                <NavBar/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;