import { JiraModel } from '../models/jira.model';
import { SysaidModel } from '../models/sysaid.model';

export class SysaidController{
    private jiraModel: JiraModel;
    private sysaidModel: SysaidModel;
    
    constructor(
    ){
        this.jiraModel = new JiraModel();
        this.sysaidModel = new SysaidModel();
    }

    syncWithJira(req: any, res:any): void{
        var srId:string = req.params['srId'];
        this.sysaidModel.syncWithJira(srId).then((sr)=>{
            this.jiraModel.createIssue(sr).then((issueKeys)=>{
                this.jiraModel.syncWithSysAid( issueKeys["key"] ).then( (issue ) =>{
                    this.sysaidModel.updateSRFromJira(issue).then( (srUpdate) =>{
                        res.json({
                            status: true,
                            issue: issueKeys,
                            message: 'Update success.'
                        });
                    }).catch((error)=>{
                    res.send({
                        status: false,
                        message: error
                    });
                });
                }).catch((error)=>{
                    res.send({
                        status: false,
                        message: error
                    });
                });
            }).catch((error) =>{
                res.send({
                    status: false,
                    message: error
                });
            });            
        }).catch((error) =>{
            res.send({
                status: false,
                message: error
            });
        });
    }
    
    
    getFields(req: any, res:any): void{
        this.sysaidModel.getFields( ).then((result)=>{
            res.json({
                status: true,
                fields: result
            });
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            });
        });
    }
    
    getFieldOptions(req: any, res:any): void{
        var srId:string = req.params['fieldKey'];
        this.sysaidModel.getFieldOptions(srId).then((result)=>{
            res.json({
                status: true,
                options: result['values']
            });
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            });
        });
    }
}