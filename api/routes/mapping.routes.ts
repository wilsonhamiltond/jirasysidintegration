import { MappingController } from '../controllers/mapping.controller';

export class MappingRoutes{
    private mappingController: MappingController;
    constructor(app:any){
        this.mappingController = new MappingController();
        app.get('/api/mapping', (req, res) => this.mappingController.list(req, res));
        app.get('/api/mapping/:_id',  (req, res) => this.mappingController.get(req, res) );
        app.post('/api/mapping',  (req, res) => this.mappingController.save(req, res) );
        app.put('/api/mapping/:_id',  (req, res) => this.mappingController.update(req, res) );
        app.delete('/api/mapping',  (req, res) => this.mappingController.delete(req, res) );
    }
}