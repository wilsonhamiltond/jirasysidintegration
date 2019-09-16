import * as mongoose from 'mongoose';
import { defer } from 'q';
import * as config from 'config';
import { OptionSchema } from './option.model'

export const MappingSchema = new mongoose.Schema({ 
    name: {
        type: String
    },
    sysaidField: {
        type: String,
        required: true
    },
    jiraField: {
        type: String,
        required: true
    },
    jiraProperty: {
        type: String
    },
    options: [OptionSchema],
    dateAt: {
        type: Date,
        default: Date()
    }
});

export class MappingModel{
    mappingMongoModel: any;
    
    constructor(){
        this.mappingMongoModel = mongoose.model('mapping', MappingSchema );
    }
    
    list( ){
        var def = defer();
        this.mappingMongoModel.find( {}, (error, docs) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
    
    get( _id:string ){
        var def = defer();
        this.mappingMongoModel.find( {_id: _id}, (error, docs) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
    
    delete( _id:string ){
        var def = defer();
        this.mappingMongoModel.remove( {_id: _id}, (error) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( 'Mapping delete success' )
            }
        });
        return def.promise;
    }
    
    save( _mapping){
        var def = defer();
        var mapping = new this.mappingMongoModel( _mapping );
        mapping.save( (error, doc) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Mapping save success." );
            }
        });
        return def.promise;
    }
    
    update( _id:string, _mapping:any){
        var def = defer();
        this.mappingMongoModel.update( {_id: _id}, _mapping, {}, (error, doc) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Mapping update success." );
            }
        });
        return def.promise;
    }
}