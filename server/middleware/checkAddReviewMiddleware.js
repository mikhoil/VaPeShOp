const {Review, Product} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {deviceId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Review.findOne({where: {deviceId, userId: user.id}});
        const checkDevice =  await Product.findOne({where: {id: deviceId}});

        if (!checkDevice) {
            return res.json({message: "Продукт не найден"});
        } else if(checkRating && checkDevice) {
            return res.json({message: "Вы уже оценили этот продукт"});
        }

        next();
    } catch (e) {
        return res.status(401).json({message: "Ошибка в checkAddRatingMiddleware:" + e.message});
    }
};