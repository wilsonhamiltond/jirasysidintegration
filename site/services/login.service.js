import { browserHistory } from 'react-router'

export class LoginService{
    user;
    logged;
    constructor( ){
        this.user = {};
        this.logged = false;
        this.verify();
    }
    
    verify(){
        var user = localStorage.getItem('sysaid_jira_api');
        if( user ){
            this.user = JSON.parse(user);
            this.logged = true;
        }
    }
    
    logout(){
        localStorage.removeItem('sysaid_jira_api')
        this.logged = false
        
        browserHistory.push('/#/login')
    }
    
    login(user){
        localStorage.setItem('sysaid_jira_api', JSON.stringify(user))
        this.logged = true
    }
    
    static requireAuth(nextState, replace) {
        var loginService = new LoginService();
        if (!loginService.logged) {
             replace({
               pathname: '/login',
               state: { nextPathname: nextState.location.pathname }
            })
        }else{
             replace({
               pathname: '/home',
               state: { nextPathname: nextState.location.pathname }
            })
        }
    }
    
}