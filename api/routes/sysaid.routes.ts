import { SysaidController } from '../controllers/sysaid.controller';

export class SysaidRoutes{
    private sysaidController: SysaidController;
    constructor(app: any){
        this.sysaidController = new SysaidController();
        app.get('/api/sysaid/:srId/sync', (req, res) => this.sysaidController.syncWithJira(req, res));
        
        app.get('/api/sysaid/field', (req, res) => this.sysaidController.getFields(req, res));
        
        app.get('/api/sysaid/field/:fieldKey/option', (req, res) => this.sysaidController.getFieldOptions(req, res));
    }
}