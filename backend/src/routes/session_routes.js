const { Router } = require('express');

const validators = require('../validators/validators')

const SessionController = require('../controllers/session_controller')
const sessionController = new SessionController()
const sessionRoute = SessionController.rotas()

const router = Router();

router.route(sessionRoute.login)
    .post(validators.loginValidator, sessionController.login())

router.route(sessionRoute.logout)
    .delete(sessionController.logout())

/**
 * Essa rota não vai para documentação, uso interno para verificação de Sessões
 */
router.route(sessionRoute.sessions)
    .post(sessionController.getSession())


module.exports = router