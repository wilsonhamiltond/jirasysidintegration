import { ServiceModel } from '../models/service.model';

export class ServiceController{
    serviceModel: ServiceModel;
    
    constructor(){
        this.serviceModel = new ServiceModel();
    }
    
    update(req, res){
        var service = req.body,
            _type = req.params['_type'];
        this.serviceModel.update(_type, service).then( (message) =>{
            res.json({
                status: true,
                message: message
            })
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    get(req, res){
        var _type = req.params['_type'];
        this.serviceModel.get(_type).then( (service) =>{
            res.json({
                status: true,
                service: service
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
}