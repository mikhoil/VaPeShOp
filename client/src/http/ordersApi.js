import {$authHost, $host} from "./index";

export const createOrder = async ({isAuth, cart, phoneNumber, fullName, email, country, region, city, postalCode, address}) => {
    if (isAuth) {
        const {data} = await $authHost({method:'POST', url: 'api/orders/create', data: {cart, phoneNumber, fullName, email, country, region, city, postalCode, address}})
        return data;
    } else {
        const {data} = await $host({method:'POST', url: 'api/orders/create', data: {cart, phoneNumber, fullName, email, country, region, city, postalCode, address}});
        return data;
    }
}

export const fetchOrders = async ({limit, page, isComplete}) => {
    const {data} = await $authHost.get(`api/orders/all?limit=${limit}&page=${page}&completeStatus=${isComplete}`);
    return data;
}

export const fetchChangeOrderStatus = async ({isComplete, id}) => {
    const {data} = await $authHost.put('api/orders/edit', {isComplete, id});
    return data;
}

export const fetchDeleteOrder = async ({id}) => {
    const {data} = await $authHost({method:'DELETE', url: 'api/orders/delete', data: {id}});
    return data;
}

export const getOrderData = async (id) => {
    const {data} = await $authHost.get('api/orders/' + id);
    return data;
}