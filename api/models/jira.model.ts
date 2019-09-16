import * as config from 'config';
import { defer } from 'q';
import { Utils } from '../utils/utils';
import { ServiceModel } from './service.model'
import * as request from 'request'

export class JiraModel{
    private services: any;
    private serviceModel: ServiceModel;
    private auth:any;

    constructor(){
        let jConfig = config.get('JiraConfig');
        this.auth = new Buffer( jConfig['userName'] + ':' + jConfig['password']).toString('base64');

        this.serviceModel = new ServiceModel();
        this.services = config.get('JiraConfig.services');
    }
    
    syncWithSysAid( issueId:string ): any{
        var def = defer();
        let jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: `http://${jConfig['hostName']}:${jConfig['port']}${this.services['getIssue']}${issueId}`,
            headers: {
                "Content-Type": "application/json"
                , "Authorization": "Basic " + this.auth 
            }
        }, (error, res, data) =>{
            if(error){
                def.reject(error)
            }else{
                def.resolve(typeof data =='string'? JSON.parse(data): data);
            }
        })
        return def.promise;
    }

    createIssue( sr:any ): any{
        var def = defer();
        this.createIssueFromSysAid(sr).then( (issue)=>{ 
            let jConfig = config.get('JiraConfig');
            request({
                method: 'POST',
                url: `http://${jConfig['hostName']}:${jConfig['port']}${this.services['createIssue']}`,
                headers: {
                    "Content-Type": "application/json"
                    , "Authorization": "Basic " + this.auth 
                },
                json: issue
            }, (error, res, data) =>{
                if (error || data.errors) {
                    def.reject(error || data.errors);
                }else{
                    def.resolve(typeof data =='string'? JSON.parse(data): data);
                }
            })
        }).catch((error)=>{
            def.reject(error)
        })
        return def.promise;
    }

    createIssueFromSysAid( sr:any ): any{
        var def = defer(),
            fields = { };
        this.serviceModel.get('jira').then( (service) =>{
            for( let mapping of service['mappings'] ){
                mapping = mapping._doc;
                var items:any = {};
                for( let option of mapping['options'] ){
                    items[ option['sysaidOption'] ] = option['jiraOption'];
                }

                let value = sr[ mapping['sysaidField'] ] || Utils.getKeyFromSysAid(mapping['jiraField'], sr.info, items );
                if( value !== ''){
                    var filed = {
                        sysaidKey : mapping['sysaidField'],
                        jiraKey: mapping['jiraField'],
                        value: value
                    };
                    if( mapping['jiraProperty'] != ''){
                        filed['property'] = mapping['jiraProperty'];
                    }
                    fields[ mapping['jiraField']] = Utils.getValueFromObject('property', filed);
                }
            }
            def.resolve({
                "fields": fields
            });
        }).catch( (error)=>{
            def.reject({
                "fields": fields
            })
        })
        return def.promise;
    }
    
    getFields(){
        var def = defer();
        let jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: `http://${jConfig['hostName']}:${jConfig['port']}${this.services['getFields']}`,
            headers: {
                "Content-Type": "application/json"
                , "Authorization": "Basic " + this.auth 
            }
        }, (error, res, data) =>{
            if(error){
                def.reject(error)
            }else{
                def.resolve(typeof data =='string'? JSON.parse(data): data);
            }
        })
        return def.promise;
    }
    
    getFiledOptions( fieldKey: string){
        var def = defer();
        let jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: `http://${jConfig['hostName']}:${jConfig['port']}${this.services['getFieldOptions']}`,
            headers: {
                "Content-Type": "application/json"
                , "Authorization": "Basic " + this.auth 
            }
        }, (error, res, data) =>{
            if(error){
                def.reject(error)
            }else{
                var result = typeof data =='string'? JSON.parse(data): data;
                var projects = result[fieldKey + 's'];
                var issuetypes = result.projects[0][fieldKey + 's'];

                var values = projects || issuetypes || result.projects[0].issuetypes[0].fields[fieldKey].allowedValues;
                def.resolve(values)
            }
        })
        return def.promise;
    }
}