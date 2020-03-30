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
        check("title", 'Minimo 2 letras.').isLength({min:2}),
        check("description",'Pelomenos 10 letras.').isLength({min:10}),
        check("value", 'Valor deve ser positivo.').isFloat({min:0})
    ]



}