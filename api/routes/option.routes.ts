import { OptionController } from '../controllers/option.controller';

export class OptionRoutes{
    private optionController: OptionController;
    constructor(app:any){
        this.optionController = new OptionController();
        app.get('/api/mapping/:_mappingId/option', (req, res) => this.optionController.list(req, res));
        app.get('/api/mapping/:_mappingId/option/:_id',  (req, res) => this.optionController.get(req, res) );
        app.post('/api/mapping/:_mappingId/option',  (req, res) => this.optionController.save(req, res) );
        app.put('/api/mapping/:_mappingId/option/:_id',  (req, res) => this.optionController.update(req, res) );
        app.delete('/api/mapping/:_mappingId/option',  (req, res) => this.optionController.delete(req, res) );
    }
}