import { ServiceController } from '../controllers/service.controller';

export class ServiceRoutes{
    private serviceController: ServiceController;
    constructor(app:any){
        this.serviceController = new ServiceController();
        app.get('/api/service/:_type', (req, res) => this.serviceController.get(req, res));
        app.put('/api/service/:_type',  (req, res) => this.serviceController.update(req, res) );
    }
}