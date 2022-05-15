const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/all', brandController.getAll)
router.delete('/:id', checkRoleMiddleware("ADMIN"), brandController.delete)

module.exports = router