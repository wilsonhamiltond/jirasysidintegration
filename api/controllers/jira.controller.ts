import { JiraModel } from '../models/jira.model';
import { SysaidModel } from '../models/sysaid.model';

export class JiraController{
    private jiraModel: JiraModel;
    private sysaidModel: SysaidModel;
    constructor(
    ){
        this.jiraModel = new JiraModel();
        this.sysaidModel = new SysaidModel();
    }
    
    syncWithSysAid(req:any, res:any): void{
        var issueId = req.params['issueId'];
        this.jiraModel.syncWithSysAid(issueId).then( (response) =>{
            this.sysaidModel.updateSRFromJira(response).then((result)=>{
                res.json({
                    status: true,
                    issue: result,
                    message: 'Update success.'
                });
            }).catch((error)=>{
                res.send({
                    status: false,
                    message: error
                });
            });
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            });
        });
    }
    
    getFields(req:any, res:any): void{
        this.jiraModel.getFields().then( (result) =>{
            res.json({
                status: true,
                fields: result
            })
        }).catch( (error) =>{
          res.send({
              status: false,
              message: error
          })  
        })
    }
    
    getFieldOptions(req:any, res:any): void{
        var fieldKey = req.params['fieldKey'];
        this.jiraModel.getFiledOptions(fieldKey).then( (result) =>{
            res.json({
                status: true,
                options: result
            })
        }).catch( (error) => {
          res.send({
              status: false,
              message: error
          })  
        })
    }
}