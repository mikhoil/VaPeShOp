const {Brand} = require("../models/models");
const {ApiError} = require('../error/apiError')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Brand.findOne({where:{id}})
                .then(async data => {
                    if(data) {
                        await Brand.destroy({where:{id}}).then(() => {
                            return res.json("Бренд удалён");
                        })
                    } else {
                        return res.json(ApiError.badRequest("Данный бренд не найден в базе данных"))
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()