import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._products = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 12;
        makeAutoObservable(this);
    }

    setSelectedType(selectedType) {
        this.setPage(1);
        this._selectedType = selectedType;
    }
    setSelectedBrand(selectedBrand) {
        this.setPage(1);
        this._selectedBrand = selectedBrand;
    }
    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setProducts(products) {
        this._products = products;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get products() {
        return this._products;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
