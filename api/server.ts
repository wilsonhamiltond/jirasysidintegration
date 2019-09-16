import * as express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import * as config from 'config';
import * as mongoose from 'mongoose';

var fallback = require('express-history-api-fallback')

import { JiraRoutes } from './routes/jira.routes';
import { SysaidRoutes } from './routes/sysaid.routes';
import { UserRoutes } from './routes/user.routes';
import { MappingRoutes } from './routes/mapping.routes';
import { OptionRoutes } from './routes/option.routes';
import { ServiceRoutes } from './routes/service.routes';

const rootPath = __dirname + '/../site/public';
class Server{
    private app: any;
    
    constructor(
    ){
        this.app = express();
        
        this.config();
        
        this.services();
    }
    
    config(){
        this.app.use(json());
        this.app.use(json({ type: 'application/vnd.api+json' }));
        this.app.use( express.static(__dirname + '/../node_modules'));
        this.app.use( express.static( rootPath ));
        this.app.use( express.static(__dirname + '/../dist'));
        this.app.use(fallback('index.html', { root: __dirname }))
        
        var dbConfig = config.get('dbConfig');
        
        mongoose.connect( `mongodb://${dbConfig['host']}:${dbConfig['port']}/${dbConfig['dbName']}`)
    }
    
    services(){
        new SysaidRoutes( this.app );
        new JiraRoutes( this.app );
        new UserRoutes(this.app);
        new MappingRoutes(this.app);
        new OptionRoutes(this.app);
        new ServiceRoutes(this.app);

        this.app.get('/*', function(req, res){
           res.sendFile( 'index.html', { root: rootPath }); 
        });
        
    }
    
    run(){
        return this.app.listen( process.env.PORT || 8080, () =>{
           console.log("Server running in port: " + (process.env.PORT || 8080)); 
        });
    }
    
    public static bootstrap(){
        var server = new Server();
        return server.run();
    }
}

export const app = Server.bootstrap();