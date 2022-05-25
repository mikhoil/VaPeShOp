const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, Type, Brand, Review, OrderProduct, CartProduct} = require('../models/models')
const ApiError = require('../error/ApiError');
const apiError = require("../error/apiError");
const { Op } = require("sequelize");

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, rating, brandId, typeId, info} = req.body
            console.log(req.files)
            let {img} = req.files
            const type = img.mimetype.split('/')[1];
            let fileName = uuid.v4() + `.${type}`;
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({name, price, rating, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page, sortValue, sortType} = req.query
        page = page || 1
        limit = limit || 12

        let offset = page * limit - limit
        let products;
        let productWhereOptions = {}
        let productOrderSettings = []

        if (sortValue) sortValue = sortValue.replace(/'/g,"");
        if (sortType) sortType = sortType.replace(/'/g,"");

        if (brandId) productWhereOptions = {brandId}
        if (typeId) productWhereOptions = {typeId}
        if (brandId && typeId) productWhereOptions = {brandId, typeId}
        if (sortValue && sortType) productOrderSettings = [sortValue, sortType]
        if (!brandId && !typeId) {
            if (productOrderSettings.length > 0)
                products = await Product.findAndCountAll({
                    include: [
                        {model: Brand},
                        {model: Type},
                        {model: Review}
                    ],
                    limit,
                    offset,
                    order: [
                        ['id', 'ASC'],
                        productOrderSettings
                    ]
                })
            else {
                products = await Product.findAndCountAll({
                    include: [
                        {model: Brand},
                        {model: Type},
                        {model: Review}
                    ],
                    limit,
                    offset,
                    order: [
                        ['id', 'ASC'],
                    ]
                })
            }
            return res.json(products)
        }

        if (productOrderSettings.length > 0)
            products = await Product.findAndCountAll({
                where: productWhereOptions,
                include: [
                    {model: Brand},
                    {model: Type},
                    {model: Review}
                ],
                limit,
                offset,
                order: [
                    ['id', 'ASC'],
                    productOrderSettings
                ]
            })
        else {
            products = await Product.findAndCountAll({
                where: productWhereOptions,
                include: [
                    {model: Brand},
                    {model: Type},
                    {model: Review}
                ],
                limit,
                offset,
                order: [
                    ['id', 'ASC']
                ]
            })
        }
        return res.json(products)
    }

    async getSearchAllProductsByName(req, res, next) {
        try {
            let {limit, page} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit

            const products =  await Product.findAndCountAll({
                attributes: ["name", "price", "img", "id"],
                include: [
                    {
                        attributes: ["name"],
                        model: Brand
                    },
                    {
                        attributes: ["name"],
                        model: Type
                    },
                ],
                limit,
                offset,
                order: [
                    ['id', 'ASC']
                ]
            })

            return res.json(products);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            let devices = await Product.findOne({
                where: {id},
                include: [
                    {model: ProductInfo, as: 'info'},
                    {model: Type},
                    {model: Brand},
                    {model: Review}
                ]
            });
            return res.json(devices);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Product.findOne({where:{id}})
                .then(async data => {
                    if (data) {
                        await Product.destroy({where:{id}}).then(() => {
                            return res.json("Продукт удалён");
                        })
                    } else {
                        return res.json("Продукт не найден в базе");
                    }

                    await OrderProduct.destroy({where:{productId: id}})
                    await CartProduct.destroy({where:{productId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {brandId, typeId, name, price} = req.body;

            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newValues = {};
                        brandId ? newValues.brandId = brandId : false;
                        typeId ? newValues.typeId = typeId : false;
                        name ? newValues.name = name : false;
                        price ? newValues.price = price : false;

                        if (req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newValues.img = fileName;
                        }

                        await Product.update({
                            ...newValues
                        }, {where:{id}} ).then(() => {
                            return res.json("Продукт обновлён");
                        })
                    } else {
                        return res.json("Продукт не найден в базе");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new ProductController()