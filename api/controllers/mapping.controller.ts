import { MappingModel } from '../models/mapping.model';

export class MappingController{
    mappingModel: MappingModel;
    
    constructor(){
        this.mappingModel = new MappingModel();
    }
    
    save(req, res){
        var mapping = req.body;
        this.mappingModel.save(mapping).then( (message) =>{
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
    
    update(req, res){
        var mapping = req.body,
            _id = req.params['_id'];
        this.mappingModel.update(_id, mapping).then( (message) =>{
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
        var id = req.params['_id'];
        if( id == '0'){
            res.send({
                status: false,
                message: 'object no found'
            })
        }
        this.mappingModel.get(id).then( (docs) =>{
            res.json({
                status: true,
                mapping: docs['length'] > 0? docs[0] : {}
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    list(req, res){
        this.mappingModel.list( ).then( (docs) =>{
            res.json({
                status: true,
                mappings: docs
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    delete(req, res){
        var id = req.body['_id'];
        this.mappingModel.delete( id ).then( (result) =>{
            res.json({
                status: true,
                message: result
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
}