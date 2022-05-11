const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/create', brandController.create)
router.get('/all', brandController.getAll)

module.exports = router