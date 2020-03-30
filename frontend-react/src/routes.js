import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Login  from './pages/login'
import Cadastro from './pages/cadastro'
import Casos from './pages/casos/list'
import NewCase from './pages/casos/new'
import EditCaso from './pages/casos/edit'


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/cadastro' exact component={Cadastro} />
                <Route path='/casos' exact component={Casos} /> 
                <Route path='/casos/new' exact component={NewCase} /> 
                <Route path='/casos/edit/:id' exact component={EditCaso} /> 
            </Switch>
        </BrowserRouter>
    )
}
