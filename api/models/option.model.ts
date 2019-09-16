import * as mongoose from 'mongoose';
import { defer } from 'q';
import * as config from 'config';
import { MappingModel } from './mapping.model'

export const OptionSchema = new mongoose.Schema({ 
    sysaidOption: {
        type: String
    },
    jiraOption: {
        type: String
    },
    dateAt: {
        type: Date,
        default: Date()
    }
});

export class OptionModel{
    optionMongoModel: any;
    mappingModel: MappingModel;
    constructor(){
        this.optionMongoModel = mongoose.model('option', OptionSchema );
        this.mappingModel = new MappingModel();
    }
    
    list(_mappingId: string ){
        var def = defer();
        this.mappingModel.get( _mappingId).then( (docs) =>{
            if( docs['length'] <= 0){
                def.reject( 'Mapping no found');
                return;
            }
            def.resolve( docs[0]._doc.options )
        }).catch( (error) =>{
            def.reject( error );
        });
        return def.promise;
    }
    
    get( _mappingId: string, _id:string ){
        var def = defer();
        this.mappingModel.get( _mappingId).then( (docs) =>{
            if( docs['length'] <= 0){
                def.reject( 'Mapping no found');
                return;
            }
            let option = docs[0]._doc.options.id( _id );
            def.resolve( option )
        }).catch( (error) =>{
            def.reject( error );
        });
        return def.promise;
    }
    
    delete( _mappingId:string, _id:string ){
        var def = defer();
        this.mappingModel.get( _mappingId).then( (docs) =>{
            if( docs['length'] <= 0){
                def.reject( 'Mapping no found');
                return;
            }
            let mapping = docs[0];
            mapping.options.id( _id ).remove();
            mapping.save( (error) =>{
                if (error) {
                    def.reject(error)
                } else {
                    def.resolve( 'Option delete success' )
                }
            })
        }).catch( (error) =>{
            def.reject( error );
        });
        return def.promise;
    }
    
    save(_mappingId: string, _option: any){
        var def = defer();
        this.mappingModel.get( _mappingId).then( (docs) =>{
            if( docs['length'] <= 0){
                def.reject( 'Mapping no found');
                return;
            }
            let mapping = docs[0];
            mapping.options.push(_option);
            mapping.save( (error) =>{
                if (error) {
                    def.reject(error)
                } else {
                    def.resolve( "Option save success." );
                }
            })
        }).catch( (error) =>{
            def.reject(error)
        })
        return def.promise;
    }
    
    update( _mappingId:string, _id:string, _option:any){
        var def = defer();
        this.mappingModel.get( _mappingId).then( (docs) =>{
            if( docs['length'] <= 0){
                def.reject( 'Mapping no found');
                return;
            }
            let mapping = docs[0];
            let option = mapping.options.id(_id);
            option.sysaidOption = _option.sysaidOption;
            option.jiraOption = _option.jiraOption;
            mapping.save( (error) =>{
                if (error) {
                    def.reject(error)
                } else {
                    def.resolve( "Option save success." );
                }
            })
        }).catch( (error) =>{
            def.reject(error)
        })
        return def.promise;
    }
}