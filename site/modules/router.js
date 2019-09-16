import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { LoginService } from '../services/login.service'

import { Login } from './login'
import { Template } from './template'
import { Home } from './home/home'
import { MappingList } from './mappings/list'
import { MappingCreate } from './mappings/create'
import { OptionList } from './options/list'
import { OptionCreate } from './options/create'
import { ServiceSync } from './services/sync'

export class AppRouter extends React.Component{
    render(){
        return (
          <Router history={browserHistory} >
            <Route path="/" component={Template}> 
                <IndexRoute component={Home} onEnter={LoginService.requireAuth} />
                <Route path="home" component={ Home } />
                <Route path="mappings" component={ MappingList } />
                <Route path="mappings/:_id" component={ MappingCreate } />
                <Route path="mappings/:mappingId/options" component={ OptionList } />
                <Route path="mappings/:mappingId/options/:_id" component={ OptionCreate } />
                <Route path="services/:type/sync" component={ ServiceSync } />
            </Route>
            <Route path="/login" component={Login} />
          </Router>
        )
    }
}