import { injectable } from 'inversify';
import 'reflect-metadata';
import { Router } from 'express';
import { Message } from '../../../common/communication/message';
import { DatabaseService } from '../services/DBService';

@injectable()
export class AuthController{

    router: Router;
    
    constructor(private DB_service: DatabaseService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();
        this.router.post('/', (request, response) => {
            // Send the request to the service and send the response
                var username = request.body.username;
                var password = request.body.password;
                console.log("username received from client: ", username, " password received from client: ", password);
                this.DB_service.checkUsername(username, password).then((status:Message) =>{
                    setTimeout(() => response.json(status), 1000);
                }).catch((reason: unknown) => {
                    const errorMessage: Message = {
                        title: 'Error',
                        body: reason as string,
                    };
                    response.json(errorMessage);
                });

            })
  
    }

    async authenticate(username:string, password:string): Promise<Message> {
        return {
            title: 'Authentification Statut',
            body: new Date().toString(),
        };
    }


}