import * as mongoose from 'mongoose';
import { defer } from 'q';
import * as config from 'config';

export class UserModel{
    UserSchema: any;
    
    constructor(){
        var schema = new mongoose.Schema({ 
            name: {
                type: String
            },
            password: {
                type: String
            },
            dateAt: {
                type: Date,
                default: Date()
            }
        });
        
        this.UserSchema = mongoose.model('user', schema );
    }
    
    login(user){
        var def = defer();
        this.UserSchema.find( {name: user.userName, password: user.password}, (error, docs) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
    
    createDefault(){
        var def = defer();
        var defaultUser = config.get('defaultUser');
        var admin = new this.UserSchema({ 
            name: defaultUser['name'],
            password: defaultUser['password']
        });
        admin.save( (error) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve(admin);
                console.log('Admin user created');
            }
        });
        return def.promise;
    }
}