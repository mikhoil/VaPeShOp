import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type/create', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type/all');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`'api/type/'${id}'/delete'`});
    return data;
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand/create', brand);
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand/all');
    return data;
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`'api/brand/'${id}'/delete'`});
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/create', product);
    return data;
}

export const fetchProducts = async (typeId, brandId, page, limit = 12) => {
    const {data} = await $host.get('api/product/all', {params: {
            typeId, brandId, page, limit
        }});
    return data;
}

export const fetchProductsBySortValue = async (typeId, brandId, page, limit = 6, sortValue, sortType) => {
    const {data} = await $host.get('api/product/all', {params: {
            typeId, brandId, page, limit, sortValue, sortType
        }});
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}

export const fetchDeleteProduct = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/product/${id}/delete`});
    return data;
}

export const updateProducts = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/product/${id}`, data: body});
    return data;
}

export const getAllProductsInAdminPage = async (page = 1, limit = 12) => {
    const {data} = await $authHost({method:'GET', url:`api/product/search?page=${page}&limit=${limit}`});
    return data;
}

export const addProductToCart = async (product) => {
    console.log(product)
    const {data} = await $authHost.post('api/cart/add', product);
    return data;
}

export const getProductFromCart = async () => {
    const {data} = await $authHost.get('api/cart');
    return data;
}

export const deleteProductFromCart = async (id) => {
    const {data} = await $authHost.delete(`api/cart/${id}/delete`);
    return data;
}

export const addReview = async (body) => {
    const {data} = await $authHost.post('api/review/add', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check', body);
    return data;
}
