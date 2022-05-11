const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/create', typeController.create)
router.get('/all', typeController.getAll)

module.exports = router