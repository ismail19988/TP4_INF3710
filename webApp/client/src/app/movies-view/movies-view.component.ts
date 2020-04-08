import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Movie } from '../services/index/Movie';
import { Timer } from '../services/index/Timer';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements AfterViewInit {

  private movie: Movie;
  private timer:Timer;
  private movies: Array<Movie> =  new Array<Movie>();
  private StartedWatching: boolean = false;
  private playing: boolean = false;
  private canContinue:boolean = false;
  @ViewChild('videoPlayer', { static: false })
  public videoPlayer: ElementRef<HTMLDivElement>;

  constructor(private communication: ServerCommunicationService) {
  }


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

  switchState() {
    this.playing = !this.playing
    if(this.playing){
      this.videoPlayer.nativeElement.style.backgroundImage = 'url(https://media.giphy.com/media/r7yDTMHecleQo/giphy.gif)';
      if(!this.StartedWatching) {
        this.StartedWatching = true;
      }
      this.timer.startTimer();
    } else {
      this.videoPlayer.nativeElement.style.backgroundImage = 'url(https://www.svgrepo.com/show/13672/play-button.svg)';
      this.timer.stopTimer();
    }
  }

  onMovieChange(elem: HTMLElement) {
    for(let movie of this.movies){
      if(movie.title == elem.innerHTML){
        this.movie = movie;
      }
    }

    if(this.StartedWatching) {
      // save au serveur le timer
      this.timer.resetTimer();
    } else {
      this.timer = new Timer(0, this.movie.lenghtMins);
      // get du serveur les infos du films pour proposer de continuer ou il etait et dire ecq tu veux?
    }
    this.StartedWatching = false;

  }




}
