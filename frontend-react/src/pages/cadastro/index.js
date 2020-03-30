import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.scss'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
export default function Cadastro() {
    const history = useHistory()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [city, setCity] = useState()
    const [uf, setUf] = useState()

    function handleSubmit(e){
        e.preventDefault()
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

            <form onSubmit={handleSubmit}>
                <input placeholder='Nome' onChange={(e) => setName(e.target.value)} required></input>
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required></input>
                <input placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required></input>
                <input type='number' placeholder='Whatsapp' onChange={(e) => setWhatsapp(e.target.value)} required></input>
                <div className='inputGroup'>
                    <input placeholder='Cidade' onChange={(e) => setCity(e.target.value)} required></input>
                    <input placeholder='UF' maxLength="2" style={{ width: 80}} onChange={(e) => setUf(e.target.value)} required></input>
                </div>
                <button type='submit'>Cadastrar</button>
            </form>

            </div>
        </div>
    )
}
