const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');
const checkRoleMiddleware = require('./../middleware/checkRoleMiddleware');

router.post('/create', ordersController.create)
router.get('/all', checkRoleMiddleware("ADMIN"), ordersController.getAll)
router.get('/:id', checkRoleMiddleware("ADMIN"), ordersController.getOne)
router.put('/edit', checkRoleMiddleware("ADMIN"), ordersController.updateOrder)
router.delete('/delete', checkRoleMiddleware("ADMIN"), ordersController.deleteOrder);


module.exports = router;
