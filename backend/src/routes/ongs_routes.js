const { Router } = require('express');

const validators = require('../validators/validators')

const OngsController = require('../controllers/ongs_controller')
const ongsController = new OngsController()
const ongsRoute = OngsController.rotas()

const router = Router();


router.route(ongsRoute.index)
    .get(ongsController.index())
    .post(validators.createOngValidator, ongsController.createOng())
    .delete(ongsController.deleteOng())

module.exports = router