import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useForm, ErrorMessage } from 'react-hook-form'

import api from '../../../services/api'

import './styles.scss'

import logoImg from '../../../assets/logo.svg'
export default function NewCase() {

    const history = useHistory()
    const { register, handleSubmit, errors  } = useForm()

    function onSubmit(formData){
        const { title, description, value } = formData
        api.post('/casos',{
            title,
            description,
            value
        })
        .then(response => history.push('/casos'))
        .catch(error => console.log(error.response.data.errors))
    }

    return (
        <div className="containerCadastro">
            <div className='conteudo'>
                    
                <section className='asideSection'>
                    <img src={ logoImg } alt=''/>
                    <h3>CADASTRAR CASO!</h3>
                    <Link className='link' to='/casos'>
                        <FiArrowLeft size='20' color='palevioletred'/>
                        Voltar para Home!
                    </Link>
                </section>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input placeholder='Titulo' name='title' ref={register({required:'Required'})} />
                    <ErrorMessage className='inputError' errors={errors} name="title" as="span" />

                    <textarea placeholder='Descrição' name='description' ref={register({required:'Required', minLength:{value:10, message:'Min length 10'}})} />
                    <ErrorMessage className='inputError' errors={errors} name="description" as="span" />

                    <input type='number' placeholder='Valor' min='0' name='value' ref={register({required:'Required'})} />
                    <ErrorMessage className='inputError' errors={errors} name="value" as="span" />
                    
                    <button className='button' type='submit'>Cadastrar</button>
                </form>

            </div>
        </div>
    )
}
