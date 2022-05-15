const {Cart, CartProduct, Product, ProductInfo, Brand} = require('../models/models')
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class CartController {
    async addProduct(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const cart = await Cart.findOne({where: {userId: user.id}});

            await CartProduct.create({cartId : cart.id, productId: id});

            return res.json({message: "Продукт добавлен в корзину"});
        } catch (e) {
            console.error(e);
        }
    }

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Cart.findOne({where: {userId: user.id}}).then(async userCart => {
                if(userCart.userId === user.id) {
                    await CartProduct.destroy({where: {cartId: userCart.id, productId: id}})
                }

                return res.json({message: `У вас нет доступа на удаление продукта (${id}) не из своей корзины`});
            });

            return res.json({message: "Продукт удалён из вашей корзины"});
        } catch (e) {
            console.error(e);
        }
    }

    async getProducts(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await Cart.findOne({where: {userId: user.id}});
            const cart = await CartProduct.findAll({where: {cartId: id}});

            const cartArr = [];
            for(let i = 0; i < cart.length; i++) {
                const cartProduct = await Product.findOne({
                    where: {
                        id: cart[i].productId,
                    },
                    include: [
                        {model: Brand},
                    ]
                });
                cartArr.push(cartProduct);
            }

            return res.json(cartArr);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new CartController()