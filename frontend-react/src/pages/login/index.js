import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

import { FiLogIn } from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.scss'

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    if(sessionStorage.getItem('ongName')){
        history.push('/casos')
        return null
    }
    async function handleLogin(e){
        e.preventDefault()
        try {

            const response = await api.post('/session/login', {
                email,
                password
            })
            
            sessionStorage.setItem('ongName', response.headers['x-ong-name'])
            history.push('/casos')
        } catch (error) {

            console.log(error.response.data)
            
        }
    }

    return (
        <div className='container'>
            <section className='formSection'>
                <img src={ logoImg } alt=''/>

                <form onSubmit={handleLogin}>
                    <input type='email' placeholder='E-mail' onChange = {(e) => setEmail(e.target.value)} required />
                    <input type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)} required/>
                    <button type='submit'>Entrar</button>
                    <Link className='link' to='cadastro'>
                        <FiLogIn size='20' color='palevioletred'/>
                        Não Tenho Cadastro!
                    </Link>
                </form>
            </section>
            <img className='heroImg' src={ heroesImg } alt=''/>
        </div>
    )
}
