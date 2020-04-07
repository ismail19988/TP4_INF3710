import { Component, AfterViewInit } from '@angular/core';
import { Movie } from '../services/index/Movie';
import { ServerCommunicationService } from '../services/index/server-communication.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements AfterViewInit {

  private movies:Array<Movie> =  new Array<Movie>();


  constructor(private communication: ServerCommunicationService) { }


  async ngAfterViewInit() {
    await this.getAllMovies().then((res)=> {
        console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

  async ngOnInit() {
  }

  private async getAllMovies():Promise<Array<Movie>> {
   return await new Promise((res, req) => { 
     try {
       this.movies.push(new Movie('film1','genre1','annee1',4));
       this.movies.push(new Movie('film2','genre2','annee2',4));
       res(this.movies);
     } catch(err) {

     }
   })
  }

  getMoviesByName() {

  }

  getMoviesByType(){

  }

}
