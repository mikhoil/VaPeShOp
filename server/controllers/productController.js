const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, Type, Brand, Review} = require('../models/models')
const ApiError = require('../error/ApiError');
const apiError = require("../error/apiError");
const { Op } = require("sequelize");

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, rating, brandId, typeId, info} = req.body
            console.log(req.files)
            let {img} = req.files
            let fileName = uuid.v4() + '.png'
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
        if (sortValue && sortType) productOrderSettings = [[sortValue, sortType]]

        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({
                include: [
                    {model: Brand},
                    {model: Type},
                    {model: Review}
                ],
                limit,
                offset,
                order: productOrderSettings
            })
            return res.json(products)
        }

        products = await Product.findAndCountAll({
            where: productWhereOptions,
            include: [
                {model: Brand},
                {model: Type},
                {model: Review}
            ],
            limit,
            offset,
            order: productOrderSettings
        })
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
                offset
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
}

module.exports = new ProductController()