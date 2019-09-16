import React from 'react'
import { browserHistory, Link } from 'react-router'
import { LoginService } from '../services/login.service'

export class Template extends React.Component{
    loginService;
    constructor(){
        super()
        this.loginService = new LoginService()
        this.logout = this.logout.bind(this)
    }
    
    logout(){
        this.loginService.logout()
    }
    
    render(){
        return( 
            React.createElement('div', {}, 
                React.createElement('nav', { className: 'navbar navbar-default', id: 'navbar'}, 
                    React.createElement('div', {className: 'container-fluid'}, 
                        React.createElement( 'div', {className: 'navbar-header'},
                            React.createElement( 'button', {
                                type: 'button'
                                , className: 'navbar-toggle collapsed'
                                , 'data-toggle': 'collapse'
                                , 'data-target': '#navbar'
                                , 'aria-expanded': false
                                , 'aria-controls': 'navbar'},
                                React.createElement('span', {className: 'sr-only'}, 'Toggle navigation' ),
                                React.createElement('span', {className: 'icon-bar'}),
                                React.createElement('span', {className: 'icon-bar'}),
                                React.createElement('span', {className: 'icon-bar'})
                            ),
                            React.createElement( 'a', { className: 'navbar-brand'}, 'SysAJira Integration')
                        ),
                        React.createElement( 'div', { id: 'navbar', className: 'navbar-collapse collapse'},
                            React.createElement( 'ul', { className: 'nav navbar-nav navbar-right'},
                                React.createElement( 'li', {},
                                    <Link to='/home' activeClassName="active" >Home</Link>
                                ),
                                React.createElement( 'li', {},
                                    <Link to='/mappings' activeClassName="active" >Mappings</Link>
                                ),
                                React.createElement( 'li', {},
                                    <Link to='/services/jira/sync' activeClassName="active">Jira</Link>
                                ),
                                React.createElement( 'li', {},
                                    <Link to='/services/sysaid/sync' activeClassName="active">Sysaid</Link>
                                ),
                                React.createElement( 'li', {},
                                    React.createElement( 'div', { className: 'button-container'},
                                        React.createElement('b', { className: '' }, this.loginService.user.userName + '  '),
                                        React.createElement('a', {onClick: this.logout, className: 'btn btn-danger btn-xs'}, 'Log out')
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement('div', {className: 'jumbotron col-lg-12'},
                    (this.props.children)
                )
            )
        )
    }
}