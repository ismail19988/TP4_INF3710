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
                response.json({ title: 'les films!', movies: res });
            });
        });

        this.router.post('/continue', (req, response) => {
            this.DB_service.getContinueMovie(req.body.noFilm, req.body.courriel).then((res)=>{
                console.log(res);
                response.json(res);
            }).catch(()=> {
                response.json(0);
            });
        });

        this.router.post('/savetime', (req, response) => {
            console.log(req.body);
            this.DB_service.saveMovieTime(req.body.noFilm, req.body.courriel, req.body.min).then((res)=>{
                response.json({ title: res.title, body: res.body })
            }).catch((err)=> {
                response.json({ title:'Fail', body:err });
            });
        });

        this.router.post('/update', (req, response) => {
            this.DB_service.updateMovieData(req.body.noFilm, req.body.title, req.body.type, req.body.productionDate, req.body.lenght ).then((res)=>{
                response.json({ title:res.title, body:res.body });
            }).catch((err)=> {
                response.json({ title:'Fail', body:err });
            });
        });


        this.router.post('/delete', (req, response) => {
            console.log(req.body);
            this.DB_service.deleteMovie(req.body.body).then((res)=>{
                response.json({ title: res.title, body: res.body });
            }).catch((err)=> {
                response.json({ title:'Fail', body:err });
            });
        });
    }

}
