import { OptionModel } from '../models/option.model';

export class OptionController{
    optionModel: OptionModel;
    
    constructor(){
        this.optionModel = new OptionModel();
    }
    
    save(req, res){
        var option = req.body,
            _mappingId = req.params['_mappingId'];

        this.optionModel.save(_mappingId, option).then( (message) =>{
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
        var option = req.body,
            _id = req.params['_id'],
            _mappingId = req.params['_mappingId'];
        this.optionModel.update(_mappingId, _id, option).then( (message) =>{
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
        var id = req.params['_id'],
            _mappingId = req.params['_mappingId'];
        if( id == '0'){
            res.send({
                status: false,
                message: 'object no found'
            })
        }
        this.optionModel.get(_mappingId, id).then( (option) =>{
            res.json({
                status: true,
                option: option
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    list(req, res){
        var _mappingId = req.params['_mappingId'];
        this.optionModel.list( _mappingId ).then( (docs) =>{
            res.json({
                status: true,
                options: docs
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    delete(req, res){
        var id = req.body['_id'],
            _mappingId = req.params['_mappingId'];
        this.optionModel.delete(_mappingId, id ).then( (result) =>{
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