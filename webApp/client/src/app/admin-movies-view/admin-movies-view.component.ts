import { Component, AfterViewInit } from '@angular/core';
import { Movie } from '../services/index/Movie';
import { ServerCommunicationService } from '../services/index/server-communication.service';

@Component({
  selector: 'app-admin-movies-view',
  templateUrl: './admin-movies-view.component.html',
  styleUrls: ['./admin-movies-view.component.scss']
})
export class AdminMoviesViewComponent implements AfterViewInit {

  private movies: Array<Movie> =  new Array<Movie>();
  private movie:Movie;
  constructor(private communication: ServerCommunicationService) { }

  async ngAfterViewInit() {
    await this.getAllMovies().catch((err)=>{
      console.log(err);
    });
  }

  private async getAllMovies(): Promise<Movie[]> { 
    return await new Promise((response, req) =>{
      this.communication.getAllMovies().subscribe((res) => {
        let serverAnswer = res as { title: string, movies: Movie[] };
        try {
          this.movies = serverAnswer.movies;
          response(this.movies);
        } catch(err) {
          req(err);
        }
      });
    })
  }

  async onMovieChange(elem: HTMLElement) {
    let oldMovie: number = 0;
    if(this.movie != undefined) oldMovie = this.movie.noMovie;
    let noMovie:number = +<string>elem.getAttribute('id');
    for(let movie of this.movies){
      if(movie.noMovie == noMovie){
        this.movie = movie;
      }
    }
  }


}
