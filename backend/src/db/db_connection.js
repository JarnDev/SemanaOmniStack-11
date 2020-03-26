const knex = require('knex');
const config = require('../../knexfile');

const db_connection = knex(config.development);

module.exports = db_connection