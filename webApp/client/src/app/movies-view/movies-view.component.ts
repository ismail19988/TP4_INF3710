import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Movie } from '../services/index/Movie';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements AfterViewInit {

  private movie: Movie;

  private movies: Array<Movie> =  new Array<Movie>();

  private playing: boolean = false;
  @ViewChild('videoPlayer', { static: false })
  public videoPlayer: ElementRef<HTMLDivElement>;

  constructor(private communication: ServerCommunicationService) {
    this.movie =  new Movie('','','',0)
    this.movies.push(new Movie('test1', '', '', 0))
    this.movies.push(new Movie('test2', '', '', 0))
    this.movies.push(new Movie('test3', '', '', 0))
  }


  async ngAfterViewInit() {
    await this.getAllMovies().catch((err)=>{
      console.log(err);
    });
  }

  private async getAllMovies():Promise<Movie[]>{ 
    return await new Promise((response, req) =>{
      this.communication.getAllMovies().subscribe((res) => {
        try {
          console.log(res);
          this.movies = (res as { title: string, movies: Movie[] }).movies;
          response(this.movies);
        } catch(err) {
          req(err);
        }
      });
    })
  }

  async getMovie(title:string):Promise<Movie> {
   return await new Promise((response, req) => { 
      this.communication.getMovie(title).subscribe((res) => {
        try {
          this.movie = (res as { title: string, body: Movie }).body;
          response(this.movie);
        } catch(err) {
          req(err);
        }
      });
    })
  }

  switchState(){
    this.playing = !this.playing
    if(this.playing){
      this.videoPlayer.nativeElement.style.backgroundImage = 'url(https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif)';
    } else {
      this.videoPlayer.nativeElement.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/17/17570.svg)';
    }
  }
}
