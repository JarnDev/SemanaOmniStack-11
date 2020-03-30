import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'


import api from '../../../services/api'

import './styles.scss'

import logoImg from '../../../assets/logo.svg'
export default function NewCase() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
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

                <form onSubmit={handleSubmit}>
                    <input placeholder='Titulo' onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder='Descrição' onChange={(e) => setDescription(e.target.value)} required />
                    <input type='number' placeholder='Valor' onChange={(e) => setValue(e.target.value)} required />
                    
                    <button type='submit'>Cadastrar</button>
                </form>

            </div>
        </div>
    )
}
