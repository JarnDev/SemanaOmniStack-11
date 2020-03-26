const { check } = require('express-validator');

module.exports = {

    loginValidator : [
        check('email').isEmail().notEmpty()
    ],

    createOngValidator : [
        check("name").isAlphanumeric().notEmpty(),
        check("password").isAlphanumeric().isLength({min:6}),
        check("email").isEmail().notEmpty(),
        check("whatsapp").isNumeric().notEmpty(),
        check("city").isString().notEmpty(),
        check("uf").isString().isLength({min:2,max:2}).notEmpty()
    ],

    createCasoValidator : [
        check("title").isLength({min:2}).notEmpty(),
        check("description").isLength({min:10}),
        check("value").isFloat({min:0})
    ]



}