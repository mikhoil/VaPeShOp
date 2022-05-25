const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware("ADMIN"), productController.create)
router.get('/all', productController.getAll)
router.get('/search', productController.getSearchAllProductsByName)
router.get('/:id', productController.getOne)
router.put('/:id', checkRoleMiddleware("ADMIN"), productController.update)
router.delete('/:id', checkRoleMiddleware("ADMIN"), productController.delete)

module.exports = router