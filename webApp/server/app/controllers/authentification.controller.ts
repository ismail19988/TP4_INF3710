import { injectable } from 'inversify';
import 'reflect-metadata';
import { Router } from 'express';
import { Message } from '../../../common/communication/message';
import { DatabaseService } from '../services/DBService';

@injectable()
export class AuthController {
    router: Router;

    constructor(private DB_service: DatabaseService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();
        this.bindLoginRoute();
        this.bindRegisterRoute();
    }

    bindLoginRoute(){
        this.router.post('/', (request, response) => {
            // Send the request to the service and send the response
            let mail = request.body.mail;
            let password = request.body.password;
            this.DB_service.checkUsername(mail, password)
                .then((status: Message) => {
                    setTimeout(() => response.json(status), 1000);
                })
                .catch((reason: unknown) => {
                    const errorMessage: Message = {
                        title: 'Error',
                        body: reason as string,
                    };
                    response.json(errorMessage);
                });
        });
    }

    bindRegisterRoute(){
        this.router.post('/reg', (request, response) => {

            const userData = {
                fName: request.body.fName as string,
                lName: request.body.lName as string,
                mail: request.body.mail as string,
                password: request.body.password as string,
                adress: request.body.adress as string,
                postalCode: request.body.postalCode as string,
                price: request.body.price as string,
                date: request.body.date as string,
                membreMensuel: request.body.membreMensuel as boolean,
            };

            this.DB_service.registerUser(userData)
                .then((status: Message) => {
                    setTimeout(() => response.json(status), 1000);
                })
                .catch((reason: unknown) => {
                    const errorMessage: Message = {
                        title: 'Error',
                        body: reason as string,
                    };
                    response.json(errorMessage);
                });
        });
    }

}
