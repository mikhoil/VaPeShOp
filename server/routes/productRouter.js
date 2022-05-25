const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware("ADMIN"), productController.create)
router.get('/all', productController.getAll)
router.get('/search', productController.getSearchAllProductsByName)
router.get('/:id', productController.getOne)

module.exports = router