import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi'
import { toast } from 'react-toastify';

import logoImg from '../../../assets/logo.svg'

import api from '../../../services/api'

import './styles.scss'

export default function Casos() {
    const history = useHistory()
    const [casos, setCasos] = useState([])
    const ongName = sessionStorage.getItem('ongName')
    useEffect(()=>{
        if(!ongName){
            sessionStorage.clear()
            history.push('/')
            return
        }

        api.get('/profile')
        .then( response => {
            setCasos(response.data)
        })
        .catch(error => {
            if(error.response.status === 401){
                console.log('Sair')
                logOut()
            }
        })
        return
    },[ongName])

   
    if(!ongName){
        logOut()
        return null
    }
    
    
    function logOut(){
        sessionStorage.clear()
        history.push('/')
    }

    async function handleLogoff(){
        
        try {
            await api.delete('/session/logout')
            logOut()
        } catch (error) {
            console.log(error.response)
        }
    }
    
    function removeCaso(id, title){
        api.delete(`/casos/${id}`)
        .then(response => {
            setCasos(casos.filter(caso => caso.id!==id))
            toast.info(`Caso: ${title} Removido`)
        })
        .catch(error => {
            if(error.response.status === 401){
                logOut()
            }
        })
    }


    return (
        <div className='containerCase'>

            <div className='header'>
                <img src={ logoImg } alt=''/>
                <span>Bem vindo <strong>{ongName}</strong></span>
                <div className='buttonDiv'>
                    <Link className='button' to='/casos/new'>Novo Caso</Link>
                    <button onClick={handleLogoff} className='powerOff'>
                        <FiPower size='20' color='#de2041'/>
                    </button>
                </div>
                
            </div>

            { casos.length === 0 && <div className='semCaso'><p>Cadastre um Caso!</p></div>}
            { casos.length > 0 &&
                <ul>
                    { casos.map( caso => (
                    <li key={caso.id} >
                        <div className='itemHeader'>
                            <p>{caso.title}</p>
                            <p>{Intl.NumberFormat('pt-br',{style:'currency', currency:'BRL'}).format(caso.value)}</p>    
                        </div>
                        <div className='description'>
                        <p>{caso.description}</p>   
                        </div>
                        <span className='edit' onClick={()=>{history.push(`/casos/edit/${caso.id}`,{ caso })}}>
                            <FiEdit size={20} color='#059142'/>
                        </span>   
                        <span className='trash' onClick={()=>{removeCaso(caso.id, caso.title)}}>
                            <FiTrash2 size={20} color='red'/>
                        </span>   
                        
                    </li>
                    ))}
                </ul>
            }
        </div>  
    )
}
