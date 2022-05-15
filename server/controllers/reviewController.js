const {Review, Product} = require('./../models/models');
const jwt = require('jsonwebtoken');

class ReviewController {
    async addReview(req, res) {
        try {
            const {productId, text, mark} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);

            await Review.create({text: text, mark: mark, productId, userId: user.id});

            let rating = await Review.findAndCountAll({
                where: {
                    productId
                },
            });

            let allRating = 0;
            let middleRating;

            rating.rows.forEach(item => allRating += item.mark);

            middleRating = Number(allRating) / Number(rating.count);

            await Product.update(
                {rating: middleRating},
                {where: {id: productId}}
            );

            return res.json({message: "Отзыв успешно оставлен"});
        } catch (e) {
            console.error(e);
        }
    }

    async getProductReviews(req, res) {
        try {
            const {productId} = req.body
            const reviews = await Review.findAll({where: {productId}})

            if (!reviews) {
                return res.json({message: "Отзывы не найдены"})
            }
            return res.json(reviews)

        } catch (e) {
            return res.status(401).json({message: "Ошибка в reviewController"});
        }
    }

    async checkReview(req, res) {
        try {
            const {productId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkReview = await Review.findOne({where: {productId, userId: user.id}});
            const checkProduct =  await Product.findOne({where: {id: productId}});

            if (!checkProduct) {
                return res.json({allow: false});
            } else if (checkReview && checkProduct) {
                return res.json({allow: false});
            }

            return res.json({allow: true});
        } catch (e) {
            return res.status(401).json({message: "Ошибка в reviewController"});
        }
    }
}

module.exports = new ReviewController();