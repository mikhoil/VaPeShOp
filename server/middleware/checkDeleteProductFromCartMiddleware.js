const {Cart, CartProduct} = require('./../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.user;
        const userCart = await Cart.findOne({where: {userId: user.id}});
        const cartProduct = await CartProduct.findOne({where: {cartId: userCart.id, productId: id}});

        if (cartProduct) {
            return next();
        }

        return res.json({message: "Продукт не найден в корзине данного пользователя"});
    } catch (e) {
        return res.status(401).json({message: "Ошибка в checkDeleteProductFromCartMiddleware:" + e.message});
    }
};