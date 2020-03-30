import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useForm, ErrorMessage } from 'react-hook-form'

import './styles.scss'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
export default function Cadastro() {
    const history = useHistory()
    const { register, handleSubmit, errors  } = useForm()

    function onSubmit(formData){
        const {name, password, email, whatsapp, city, uf} = formData

        api.post('/ongs', {
            name,
            password,
            email,
            whatsapp,
            city,
            uf
        })
        .then(response => history.push('/'))
        .catch(error => console.log(error))
    }


    return (
        <div className="containerCadastro">
            <div className='conteudo'>
            <section className='asideSection'>
                <img src={ logoImg } alt=''/>
                <h3>CADASTRAR ONG!</h3>
                <Link className='link' to='/'>
                    <FiArrowLeft size='20' color='palevioletred'/>
                    Voltar para Login!
                </Link>
            </section>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder='Nome' name='name' ref ={ register({required: 'Required'}) }></input>
                <ErrorMessage className='inputError' errors={errors} name="name" as="span" />

                <input type='password' name='password' placeholder='Password' ref ={ register({required:'Required', minLength:{value:8, message:'Min lenght 8'}}) }></input>
                <ErrorMessage className='inputError' errors={errors} name="password" as="span" />

                <input type='email' placeholder='E-mail' name='email' ref ={ register({required:'Required'}) }></input>
                <ErrorMessage className='inputError' errors={errors} name="email" as="span" />

                <input type='number' placeholder='Whatsapp' name='whatsapp' ref ={ register({required:'Required',
                                                                                             minLength:{value:10, message:'Min lenght 10'} ,
                                                                                             maxLength:{value:11, message:'Max lenght 11'}}) }></input>
                <ErrorMessage className='inputError' errors={errors} name="whatsapp" as="span" />

                <div className='inputGroup'>
                    <div className='input'>
                        <input placeholder='Cidade' name='city' ref ={ register({required:'Required'}) }></input>
                        <ErrorMessage className='inputError' errors={errors} name="city" as="span" />
                    </div>
                    <div className='input' style={{ width: 80}}>
                        <input placeholder='UF' maxLength="2" name='uf' ref ={ register({required:'Required'}) }></input>
                        <ErrorMessage className='inputError' errors={errors} name="uf" as="span" />
                    </div>

                </div>

                <button className='button' type='submit'>Cadastrar</button>

            </form>

            </div>
        </div>
    )
}
