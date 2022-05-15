const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/all', typeController.getAll)
router.delete('/:id', checkRoleMiddleware("ADMIN"), typeController.delete);

module.exports = router