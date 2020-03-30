import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useForm, ErrorMessage } from 'react-hook-form'

import { toast } from 'react-toastify';

import { FiLogIn } from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.scss'

export default function Login() {
    const history = useHistory()

    const { register, handleSubmit, errors  } = useForm()

    if(sessionStorage.getItem('ongName')){
        history.push('/casos')
        return null
    }   
    async function handleLogin(formData){
        const { email, password } = formData
        
        try {

            const response = await api.post('/session/login', {
                email,
                password
            })
            
            sessionStorage.setItem('ongName', response.headers['x-ong-name'])
            history.push('/casos')

        } catch (error) {

            if(error.response.data.error){
                toast.error(error.response.data.error);
            }
            
            console.log(error) 
        }
    }

    return (
        <div className='container'>
            <section className='formSection'>
                <img src={ logoImg } alt=''/>

                <form onSubmit={handleSubmit(handleLogin)}>

                    <input type='email' placeholder='E-mail' name='email' ref = { register({required:'Required'}) } />
                    <ErrorMessage className='inputError' errors={errors} name="email" as="span" />

                    <input type='password' placeholder='Password' name='password' ref = { register({required:true, minLength:{ value:8, message: 'Min length 8' } } ) } />
                    <ErrorMessage className='inputError' errors={errors} name="password" as="span" />

                    <button className='button' type='submit'>Entrar</button>

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
