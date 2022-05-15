const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const checkDeleteProductFromCart = require('../middleware/checkDeleteProductFromCartMiddleware')

router.post('/add', authMiddleware, cartController.addProduct)
router.get('/', authMiddleware, cartController.getProducts)
router.delete('/:id/delete', authMiddleware, checkDeleteProductFromCart, cartController.deleteProduct)

module.exports = router