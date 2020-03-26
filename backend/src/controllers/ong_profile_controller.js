const db_connection = require('../db/db_connection');



class OngProfileController{

    static rotas(){
        return{
            index:'/'
        }
    }


    index(){
        return async(req, res) => {

            const { ong_id } = req.session;

            if( !ong_id ){
                return res.status(401).json({ error: 'Logue para buscas casos específicos da ONG!'});
            }

            const result = await db_connection('casos').where('ong_id', ong_id).select();

            return res.json(result)

        }
    }

}

module.exports = OngProfileController