import React from 'react'
import { browserHistory } from 'react-router'
import { LoginService } from '../services/login.service'
import * as jQuery from 'jquery'

export class Login extends React.Component{
    login(evt){
        var user = {
            userName: this.refs.userName.value,
            password: this.refs.password.value
        };
        jQuery.ajax({
            method: 'POST'
            , url: '/api/user/login'
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify( user )
        }).then( (response, status) =>{
            if(status == 'success'){
                if( response.status == true){
                    this.loginService.login(user)
                    browserHistory.push('/home')
                }else{
                    alert('User name and password is invalid')
                }
            }else{
                console.log(response);
            }
        });
        evt.preventDefault();
        return true;
    }
    constructor(){
        super()
        this.loginService = new LoginService();
        this.login = this.login.bind(this)
    }
    render(){
        return( 
            React.createElement('form', {className: 'form-signin', onSubmit: this.login}, 
                React.createElement('h2', { className: 'form-signin-heading text-center'}, 'Please sign in'),
                React.createElement('label', {className: 'sr-only'}, 'User Name'),
                React.createElement('input', { type: 'text', ref: 'userName', className: 'form-control', required: true, autofocus: true}),
                React.createElement('label', {className: 'sr-only'}, 'Password'),
                React.createElement('input', { type: 'password', ref: 'password', className: 'form-control'}),
                React.createElement('button', { type: 'submit', className: 'btn btn-lg btn-primary btn-block'}, 'Sign in')
            )
        )
    }
}