import * as config from 'config';
import { defer } from 'q';
import { Utils } from '../utils/utils';
import * as http from 'http'
import { ServiceModel } from './service.model'
import * as request from 'request'

const headers = { "Content-Type": "application/json" };

export class SysaidModel{
    private services: any;
    private httpOptions: any;
    private mappings: any;
    private mappingFildOptions: any;
    private serviceModel: ServiceModel;

    constructor(){
        let sConfig = config.get('SYSIdConfig');
        this.services = config.get('SYSIdConfig.services');
        this.serviceModel = new ServiceModel();
    }

    login(){
        var def = defer();
        let sConfig = config.get('SYSIdConfig');
        let loginData = {
            "account_id": sConfig['accoundId'],
            "user_name": sConfig['userName'],
            "password":  sConfig['password']
        };
        request({
            method: 'POST',
            url: `http://${sConfig['hostName']}:${sConfig['port']}${this.services['login']}`,
            headers: {
                "Content-Type": "application/json"
            },
            json: loginData
        }, (error, res, data) =>{
            if(error){
                def.reject(error)
            }else{
                var cookie = res.headers['set-cookie'][0];
                def.resolve( {
                    data: data,
                    cookie: cookie
                } );
            }
        })
        return def.promise;
    }

    syncWithJira( srId:string ){
        var def = defer();
        let sConfig = config.get('SYSIdConfig');
        this.login().then( (result) => {
            request({
                method: 'GET',
                url: `http://${sConfig['hostName']}:${sConfig['port']}${this.services['sr']}${srId}`,
                headers: {
                    'Cookie': result['cookie']
                }
            }, (error, res, data) =>{
                if(error){
                    def.reject( error )
                }else{
                    def.resolve( JSON.parse( data ) );
                }
            })
        }).catch((error)=>{
            def.reject(error);
        });
        return def.promise;
    }

    updateSRFromJira( issue:any ): any{
        var def = defer();
        let sConfig = config.get('SYSIdConfig');
        this.mapIssueToSR(issue).then((sr)=>{
            this.login().then( (result) => {
                request({
                    method: 'PUT',
                    url: `http://${sConfig['hostName']}:${sConfig['port']}${this.services['sr']}${sr['id']}`,
                    json: sr,
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": result['cookie']
                    },
                }, (error, res, data) =>{
                    if(error){
                        def.reject( error )
                    }else{
                        if(!data){
                            def.resolve( sr );
                        }else{
                            def.reject(data);
                        }
                    }
                })
            }).catch((error)=>{
                def.reject(error);
            });
        }).catch((error) =>{
            def.reject(error)
        })
        return def.promise;
    }

    private mapIssueToSR(issue: any):any{
        var def = defer();
        var sr = { 
            info: []
        };
        this.serviceModel.get('sysaid').then( (service) =>{
            for( let mapping of service['mappings'] ){
                mapping = mapping._doc;
                var items:any = {};
                for( let option of mapping['options']){
                    items[ option['jiraField'] ] = option['sysaidField'];
                }
                var field = issue[mapping['jiraField']] || issue.fields[ mapping['jiraField'] ];
                if( field ){
                    if( mapping['jiraProperty'] != '' ){
                        field = field[ mapping['jiraProperty'] ];
                    }
                    if (mapping['sysaidField'] == 'id') {
                        sr[mapping['sysaidField']] = issue.fields[mapping["jiraField"]];
                    }else{
                        sr.info.push({
                            "key": mapping['sysaidField'],
                            "value": field
                        });
                    }
                }
            }
            def.resolve(sr)
        })
        
        return def.promise;
    }
    
    getFields(  ){
        let sConfig = config.get('SYSIdConfig');
        var def = defer();
        this.login().then( (result) => {
            request({
                method: 'GET',
                url: `http://${sConfig['hostName']}:${sConfig['port']}${this.services['getFields']}`,
                headers: {
                    'Cookie': result['cookie']
                }
            }, (error, res, data) =>{
                if(error){
                    def.reject( error )
                }else{
                    def.resolve( JSON.parse( data ).info );
                }
            })
        }).catch((error)=>{
            def.reject(error);
        });
        return def.promise;
    }
    
    getFieldOptions( srId:string ){
        let sConfig = config.get('SYSIdConfig');
        var def = defer();
        this.login().then( (result) => {
            request({
                method: 'GET',
                url: `http://${sConfig['hostName']}:${sConfig['port']}${this.services['getFieldOption']}/${srId}`,
                headers: {
                    'Cookie': result['cookie']
                }
            }, (error, res, data) =>{
                if(error){
                    def.reject( error )
                }else{
                    def.resolve(JSON.parse( data) )
                }
            })
        }).catch((error)=>{
            def.reject(error);
        });
        return def.promise;
    }
}