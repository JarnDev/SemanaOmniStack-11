const express = require('express');
const cors = require('cors');
const session = require('express-session');

const routes = require('../routes/routes')

const app = express()

app.use(cors({
    'exposedHeaders':'X-Ong-Name, X-Total-Count',
    'origin': 'http://localhost:3000',
    'credentials': true
}))
app.use(express.json())
app.use(session({
    secret:"SemanaOmniStack11",
    saveUninitialized:false,
    resave:false
}))

routes(app)

module.exports = app
