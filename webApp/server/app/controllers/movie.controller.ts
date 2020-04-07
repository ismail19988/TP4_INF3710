import { injectable } from 'inversify';
import 'reflect-metadata';
import { Router } from 'express';
//import { Message } from '../../../common/communication/message';
import { DatabaseService } from '../services/DBService';
import { Movie } from '../services/Movie';

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
                let movies = new Array<Movie>();
                movies.push(new Movie('a','b','c',2))
                movies.push(new Movie('aa','bb','cc',22))

                response.json({title:'les films!', movies});
            });
        });
    }


}
