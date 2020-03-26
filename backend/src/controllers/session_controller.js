const db_connection = require('../db/db_connection');
const crypto = require('crypto')
const { validationResult } = require('express-validator');
class SessionController{

    static rotas(){
        return {
            login: '/login',
            logout: '/logout',
            sessions:'/list'
        }
    }

    login(){
        return async (req, res) => {

            const reqErrors = validationResult(req)

            if(!reqErrors.isEmpty()){
                return res.status(401).json(reqErrors)
            }

            const { email, password } = req.body

            const hashed_password = crypto.createHash('sha256').update(`${password}`).digest('HEX')

            const [ result ] = await db_connection('ongs').whereRaw('email=? AND password=?',[email, hashed_password])
            
            req.session.ong_id = result.id

            return res.status(200).send();

        }
    }
    
    logout(){
        return async (req, res) => {
            console.log( 'OK')
            if(!req.session.ong_id){
                return res.status(400).json({ error: "Usuário não está logado."})
            }
            await req.session.destroy();   
            res.clearCookie()
            return res.status(204).send()
        }
    }

    getSession(){
        return async (req, res) =>{
            return res.json(req.sessionStore)
        }
    }


}

module.exports = SessionController;