const ongsRoutes = require('./ongs_routes')
const casosRoutes = require('./casos_routes')
const ongProfileRoutes = require('./ong_profile_routes')
const sessionRoutes = require('./session_routes')

module.exports = (app) => {

    app.use('/ongs', ongsRoutes),
    app.use('/casos', casosRoutes),
    app.use('/profile', ongProfileRoutes)
    app.use('/session', sessionRoutes)
}
