import { UserModel } from '../models/user.model';

export class UserController{
    userModel: UserModel;
    
    constructor(){
        this.userModel = new UserModel();
    }
    
    createDefault(req, res){
        this.userModel.createDefault().then( (message) =>{
            res.json({
                status: true,
                message: message
            })
        }).catch( (error) =>{
            res.send({
                status: false,
                message: new Error(error)
            })
        })
    }
    
    login(req, res){
        var user = req.body;
        this.userModel.login(user).then( (docs) =>{
            if( docs['length'] > 0){
                res.json({
                    status: true,
                    user: docs[0]
                })
            }else{
                res.json({
                    status: false,
                    message: 'User name of password are invalid'
                })
            }
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
}