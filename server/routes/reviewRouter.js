const Router = require('express');
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware');
const checkAddReviewMiddleware = require('../middleware/checkAddReviewMiddleware');
const reviewController = require('./../controllers/reviewController')

router.post('/', authMiddleware, checkAddReviewMiddleware, reviewController.addReview)
router.get('/:id', reviewController.getProductReviews)
/*router.post('/check-review', authMiddleware,  reviewController.checkReview);*/

module.exports = router;