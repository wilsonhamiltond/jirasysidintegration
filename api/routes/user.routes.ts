import { UserController } from '../controllers/user.controller';
import { Router } from 'express';

export class UserRoutes{
    private userController: UserController;
    constructor(app:any){
        this.userController = new UserController();
        app.get('/api/user/create/default', (req, res) => this.userController.createDefault(req, res));
        app.post('/api/user/login',  (req, res) => this.userController.login(req, res) );
    }
}