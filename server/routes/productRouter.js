const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/create', productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

module.exports = router