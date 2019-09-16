import { JiraController } from '../controllers/jira.controller';
import { Router } from 'express';
export class JiraRoutes{
    private jiraController: JiraController;
    constructor(app:any){
        this.jiraController = new JiraController();
        app.get('/api/jira/:issueId/sync', (req, res) => this.jiraController.syncWithSysAid(req, res));
        
        app.get('/api/jira/field', (req, res) => this.jiraController.getFields(req, res));
        
        app.get('/api/jira/field/:fieldKey/option', (req, res) => this.jiraController.getFieldOptions(req, res));
    }
}