import { injectable } from 'inversify';
import 'reflect-metadata';
import { Router } from 'express';
//import { Message } from '../../../common/communication/message';
import { DatabaseService } from '../services/DBService';

@injectable()
export class MovieController {
    router: Router;

    constructor(private DB_service: DatabaseService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();
        this.bindAllMoviesRoute();
    }

    bindAllMoviesRoute(){
        this.router.get('/all', (req, response) => {
            this.DB_service.getAllMovies().then((res)=>{
                response.json({title:'les films!', movies: res});
            });
        });
    }


}
