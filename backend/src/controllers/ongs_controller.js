
const db_connection = require('../db/db_connection');
const crypto = require('crypto')
const { validationResult } = require('express-validator');
class OngsController{

    static rotas(){
        return {
            index: '/'
        }
    }


    index(){
        return async (req, res)=>{

            const result = await db_connection('ongs')
                                    .select(
                                        [
                                            'id',
                                            'name',
                                            'email',
                                            'whatsapp',
                                            'city',
                                            'uf'
                                        ]
                                    )     

            return res.json(result)

        }
    }

    createOng(){
        return async(req, res) => {

            const reqErrors = validationResult(req)

            if(!reqErrors.isEmpty()){
                return res.status(400).json(reqErrors)
            }

            var { name, password, email, whatsapp, city , uf } = req.body

            const id = crypto.randomBytes(4).toString("HEX")
            password = crypto.createHash('sha256').update(password).digest('HEX')

            const result = await db_connection('ongs').whereRaw('name=? OR email=?',[name, email]).select();

            if(result.length !== 0 ){
                return res.status(401).json({ error: "Ong ou email já cadastrado!" })
            }

            await db_connection('ongs').insert({
                id,
                name,
                password,
                email,
                whatsapp,
                city,
                uf
            });

            return res.status(204).send()

        }
    }

    deleteOng(){
        return async (req, res) => {
            const { ong_id } = req.session;

            if(!ong_id){
                return res.status(401).json({ error: "Faça Login para excluir a conta!" })
            }

            await db_connection('ongs').where('id', ong_id).delete();

            return res.status(204).send()

        }
    }


}

module.exports = OngsController