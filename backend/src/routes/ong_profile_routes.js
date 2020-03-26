const { Router } = require('express');

const OngProfileController = require('../controllers/ong_profile_controller')
const ongProfileController = new OngProfileController()
const ongProfileRoute = OngProfileController.rotas()

const router = Router();


router.route(ongProfileRoute.index)
    .get(ongProfileController.index())


module.exports = router