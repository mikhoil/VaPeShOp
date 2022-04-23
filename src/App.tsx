import React from 'react';
import './App.css';
import {Logo} from "./components/logo";
import {Navbar} from "./components/navbar";
import {Link, Route, Routes} from "react-router-dom";
import Cart from './components/cart';

function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header>
                    <Logo/>
                    <Link to="cart">
                        <button className="cart__btn">Корзина</button>
                    </Link>
                </header>
                <Navbar/>
            </div>
           <Routes>
               <Route path='cart' element={<Cart/>}/>
           </Routes>
        </>
    );
}

export default App;
