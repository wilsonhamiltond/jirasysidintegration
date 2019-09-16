import * as mongoose from 'mongoose';
import { defer } from 'q';
import * as config from 'config';
import { MappingSchema } from './mapping.model'

export const ServiceSchema = new mongoose.Schema({ 
    type: {
        type: String,
        required: true
    },
    mappings: [MappingSchema],
    dateAt: {
        type: Date,
        default: Date()
    }
});

export class ServiceModel{
    serviceModel: any;
    
    constructor(){
        this.serviceModel = mongoose.model('service', ServiceSchema );
    }
    
    get( _type:string ){
        var def = defer();
        this.serviceModel.find( {type: _type}, (error, docs) =>{
            if( error ){
                def.reject( error );
            }else{
                if( docs['length'] <=0 ){
                    def.resolve({
                        type: _type,
                        mappings: []
                    })
                }else{
                    def.resolve( docs[0]._doc )
                }
            }
        });
        return def.promise;
    }
    
    update( _type:string, _service:any){
        var def = defer();
        this.serviceModel.find( {type: _type}, (error, docs) =>{
            if( error ){
                def.reject( error );
            }else{
                if( docs['length'] <=0 ){
                    var service = new this.serviceModel( _service );
                    service.save( (error, doc) =>{
                        if (error) {
                            def.reject(error)
                        } else {
                            def.resolve( "Service update success." );
                        }
                    });
                }else{
                    var service = docs[0];
                    service.mappings = _service.mappings;
                    service.save( ( error) =>{
                        if( error ){
                            def.reject( error );
                        }else{
                            def.resolve( "Service update success" )
                        }
                    });
                }
            }
        });
        return def.promise;
    }
}