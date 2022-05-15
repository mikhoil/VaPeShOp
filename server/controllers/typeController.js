const {Type} = require('../models/models')
const {ApiError} = require('../error/apiError')
const uuid = require("uuid");
const path = require("path");

class TypeController {
    async create(req, res) {
        const {name} = req.body
        let {img} = req.files
        let fileName = uuid.v4() + '.png'

        if (!name) {
            return res.json({message: "Имя типа обязательно"});
        }
        if (!img) {
            return res.json({message: "Изображение обязательно"});
        }

        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const type = await Type.create({name, img: fileName})
        return res.json(type)
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Type.findOne({where:{id}})
                .then(async data => {
                    if (data) {
                        await Type.destroy({where:{id}}).then(() => {
                            return res.json({message: "Тип удалён"});
                        })
                    } else {
                        return res.json(ApiError.badRequest("Данный тип не найден в базе данных"))
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()