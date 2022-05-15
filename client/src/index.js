import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {App} from './App';
import UserStore from "./store/UserStore";
import CartStore from "./store/CartStore";
import ProductStore from "./store/ProductStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            cart: new CartStore(),
            product: new ProductStore()
        }
    }>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);