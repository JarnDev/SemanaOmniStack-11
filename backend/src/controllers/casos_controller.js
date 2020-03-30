const db_connection = require('../db/db_connection');
const { validationResult } = require('express-validator');

class CasosController{

    static rotas(){
        return {
            index: '/',
            caso_id:'/:id'
        }
    }


    index(){
        return async (req, res) => {

            const { page = 1 } = req.query;

            const [ count ] = await db_connection('casos').count();

            const result = await db_connection('casos')
                                .leftJoin('ongs', 'ongs.id', '=', 'casos.ong_id')
                                .limit(5)
                                .offset( (page-1) * 5 )
                                .select([
                                    'casos.*',
                                    'ongs.name',
                                    'ongs.email',
                                    'ongs.whatsapp',
                                    'ongs.city',
                                    'ongs.uf'
                                ]);

            res.header('X-Total-Count', count['count(*)'])
            return res.json(result);

        }
    }

    createCaso(){
        return async (req, res) => {

            const reqErrors = validationResult(req)

            if(!reqErrors.isEmpty()){
                return res.status(400).json(reqErrors)
            }

            const { title, description, value } = req.body;

            const { ong_id } = req.session;

            if(!ong_id){
                return res.status(401).json({ error: "Faça Login para Criar um caso!" })
            }

            await db_connection('casos').insert({
                title,
                description,
                value,
                ong_id
            });

            return res.status(204).send();
        }
    }

    editCaso(){

        return async (req, res) => {
            const { id } = req.params;
            const {title, description, value} = req.body
            
            const { ong_id } = req.session

            if( !ong_id ){
                return res.status(401).json({ error: 'Operação não Autorizada!'});
            }

            await db_connection('casos').where('id', id).update({title:title, description:description, value:value});

            return res.status(204).send();
        }

    }

    deleteCaso(){
        return async (req, res) => {

            const { id } = req.params;
            const { ong_id } = req.session
            const [ result ] = await db_connection('casos').where('id',id).select('ong_id');

            if( !ong_id || result.ong_id !== ong_id){
                return res.status(401).json({ error: 'Operação não Autorizada!'});
            }

            await db_connection('casos').where('id', id).delete();

            return res.status(204).send();

        }
    }

}

module.exports = CasosController;