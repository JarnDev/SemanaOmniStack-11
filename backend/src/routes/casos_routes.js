const { Router } = require('express');
const validators = require('../validators/validators')

const CasosController = require('../controllers/casos_controller')
const casosController = new CasosController()
const casosRoute = CasosController.rotas()

const router = Router();


router.route(casosRoute.index)
    .get(casosController.index())
    .post(validators.createCasoValidator, casosController.createCaso())

router.route(casosRoute.caso_id)
    .delete(casosController.deleteCaso())



module.exports = router