import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'


import api from '../../../services/api'

// import './styles.scss'

import logoImg from '../../../assets/logo.svg'
export default function EditCaso(props) {
    const { caso } = props.location.state
    const [title, setTitle] = useState(caso.title)
    const [description, setDescription] = useState(caso.description)
    const [value, setValue] = useState(caso.value)
    const history = useHistory()
    
    function handleSubmit(e){
        e.preventDefault()
        api.put(`/casos/${caso.id}`, {
            title,
            description,
            value
        })
        .then(response => history.push('/casos'))
        .catch(error => console.log(error))

    }

    return (
        <div className="containerCadastro">
            <div className='conteudo'>
                    
                <section className='asideSection'>
                    <img src={ logoImg } alt=''/>
                    <h3>EDITAR CASO!</h3>
                    <Link className='link' to='/casos'>
                        <FiArrowLeft size='20' color='palevioletred'/>
                        Voltar para Home!
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input placeholder='Titulo' onChange={(e) => setTitle(e.target.value)} value={title} required/>
                    <textarea placeholder='Descrição' onChange={(e) => setDescription(e.target.value)} value={description} required />
                    <input type='number' placeholder='Valor' onChange={(e) => setValue(e.target.value)} value={value} required />
                    
                    <button type='submit'>Editar</button>
                </form>

            </div>
        </div>
    )
}
