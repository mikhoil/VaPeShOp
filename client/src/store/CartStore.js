import {makeAutoObservable} from "mobx";
import {deleteProductFromCart} from "../http/productApi";

export default class CartStore {
    constructor() {
        this._totalPrice = 0;
        this._cart = [];
        makeAutoObservable(this);
    }

    async setDeleteCartItem(product, isAuth = false) {
        if (isAuth) {
            await deleteProductFromCart(product.id).then(() => {
                this._cart = this._cart.filter(item => item.id !== product.id);
                this._totalPrice -=  product.price * product.count;
            });
        } else {
            this._cart = this._cart.filter(item => item.id !== product.id);
            this._totalPrice -=  product.price * product.count;

            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setCart(item, isAuth = false) {
        const checkProductInCart = this._cart.findIndex(product => product.id === item.id);

        if (checkProductInCart < 0) {
            this._cart = [...this._cart, { count: 1, ...item}];
            let totalPrice = 0;
            this._cart.forEach(product => totalPrice += Number(product.price * product.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setDeleteAllProductFromCart() {
        this._totalPrice = 0;
        return this._cart = [];
    }

    setCountProduct(productId, action, isAuth = false) {
        const itemInd = this._cart.findIndex(item => item.id === productId);
        const itemInState = this._cart.find(product => product.id === productId);

        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemInd), newItem, ...this._cart.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemInd), newItem, ...this._cart.slice(itemInd + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }

        let totalPrice = 0;
        this._cart.forEach(product => totalPrice += Number(product.price * product.count));
        this._totalPrice = totalPrice;
    }

    resetCart() {
        this._cart = [];
        this._totalPrice = 0;
        localStorage.removeItem('cart');
    }

    get cart() {
        return this._cart;
    }

    get price() {
        return this._totalPrice;
    }
}
