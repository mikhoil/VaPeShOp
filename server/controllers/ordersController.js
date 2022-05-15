const {Orders, OrderProduct, Product, Brand, Type, CartProduct} = require('../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');

class OrdersController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const {cart, phoneNumber, fullName, email, country, region, city, postalCode, address} = req.body;

        try {
            let parseProducts = [];
            for (let key of cart) {
                parseProducts.push(key.id)
            }

            const productsInBase = await Product.findAndCountAll({
                where: {id: parseProducts},
                attributes: ["id"]
            });

            if (productsInBase.count === parseProducts.length) { //все продукты из запроса найдены в базе
                const orderData = {phoneNumber, fullName, email, country, region, city, postalCode, address};

                if (auth) {
                    const token = auth.split(' ')[1];
                    const {id} = jwt.verify(token, process.env.SECRET_KEY);
                    orderData.userId = id;
                }

                await Orders.create(orderData).then(order => {
                    const {id} = order.get();
                    console.log(id)
                    parseProducts.forEach( async (productId, i) =>  {
                        await OrderProduct.create({
                            orderId: id,
                            productId: productId,
                            count: cart[i].count
                        });
                        await CartProduct.destroy({
                            where: {
                                productId: productId
                            }
                        })
                    });
                });
            } else { //ошибка, не все продукты найдены
                const notFoundProducts = [];
                const foundProducts = [];
                productsInBase.rows.forEach(item => foundProducts.push(item.id));
                parseProducts.forEach(productId => {
                    if(!foundProducts.includes(productId)) {
                        notFoundProducts.push(productId);
                    }
                });
                return ApiError.badRequest(res.json(`Некоторые продукты с id (${notFoundProducts.join(', ')}) не найдены в базе`));
            }

            return res.json("Спасибо за заказ, скоро мы с вами свяжемся");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const {isComplete, id} = req.body;

            await Orders.findOne({where:{id}})
                .then(async data => {
                    if (data) {
                        await Orders.update({isComplete}, {where:{id}} ).then(() => {
                            return res.json("Заказ обновлён");
                        })
                    } else {
                        return res.json("Заказ не найден в базе");
                    }
                })
        } catch (e) {
            return res.json("Обновление не завершено, ошибка: " + e);
        }

    }

    async deleteOrder(req, res) {
        try {
            const {id} = req.body;

            await Orders.findOne({where:{id}})
                .then(async data => {
                    if (data) {
                        await Orders.destroy({where:{id}}).then(() => {
                            return res.json("Заказ удалён");
                        })
                    } else {
                        return res.json("Заказ не найден в базе");
                    }
                })
        } catch (e) {
            return res.json("Удаление не завершено, ошибка: " + e);
        }
    }

    async getAll(req, res) {
        let {page, limit, completeStatus} = req.query;
        page = page || 1;
        limit = limit || 6;
        let offset = page * limit - limit;
        let orders;

        let isComplete = !!Number(completeStatus)

        if (completeStatus === 'undefined') {
            orders = await Orders.findAndCountAll({
                limit,
                offset,
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.json(orders);
        }

        if (isComplete) {
            orders = await Orders.findAndCountAll({
                where: {isComplete: true},
                limit,
                offset,
                order: [
                    ['id', 'ASC']
                ]
            });
        } else {
            orders = await Orders.findAndCountAll({
                where: {isComplete: false},
                limit,
                offset,
                order: [
                    ['id', 'ASC']
                ]
            });
        }

        return res.json(orders);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let orderProducts;
            let products = [];

            await Orders.findOne({where:{id}})
                .then(async data => {
                    order.order = data;
                    orderProducts = await OrderProduct.findAll({
                        attributes: ["productId", "count"],
                        where: {orderId: data.id},
                    });

                    for (let product of orderProducts) {
                        await Product.findOne({
                            attributes: ["name", "img", "price"],
                            where: {id: product.productId},
                            include: [
                                {
                                    attributes: ["name"],
                                    model: Type
                                },
                                {
                                    attributes: ["name"],
                                    model: Brand
                                },
                            ]
                        }).then(async item => {
                            let product = {
                                product: item,
                                count: product.count
                            }
                            products.push(product);
                        });
                    }
                    order.products = products;

                    return res.json(order);
                }).catch(() => {
                    return res.json("Заказ не найден в базе");
                });
        } catch (e) {
            return res.json("Получение заказа не завершено, ошибка: " + e);
        }
    }
}

module.exports = new OrdersController();
