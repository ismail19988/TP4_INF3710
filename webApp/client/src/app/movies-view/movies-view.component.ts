import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Movie } from '../services/index/Movie';
import { Timer } from '../services/index/Timer';
import { UserSessionService } from '../user-session.service';

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
  public canContinue:boolean = false;
  public whereToContinue:number = 0;
  @ViewChild('videoPlayer', { static: false })
  public videoPlayer: ElementRef<HTMLDivElement>;

  constructor(private communication: ServerCommunicationService, private session:UserSessionService) {

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

  async onMovieChange(elem: HTMLElement) {
    this.playing = false;
    //let oldMovie = this.movie.noMovie;
    let noMovie:number = +<string>elem.getAttribute('id');
    for(let movie of this.movies){
      if(movie.noMovie == noMovie){
        this.movie = movie;
      }
    }

    if(this.StartedWatching) {
      // save au serveur le timer
      this.timer.resetTimer();
      this.videoPlayer.nativeElement.style.backgroundImage = 'url(https://www.svgrepo.com/show/13672/play-button.svg)';
    }
    await this.getCanContinue(noMovie).then((res)=>{
      this.canContinue = (res !== 0) && res != undefined;
      this.whereToContinue = res;
      // set un timeout pour retirer la div qui demande de continuer apres un certains temps comme 10-15 secondes
    }).catch((err)=>{
      console.log(err)
    });

    console.log('fini');
    this.timer = new Timer(0, this.movie.lenghtMins);
    // get du serveur les infos du films pour proposer de continuer ou il etait et dire ecq tu veux?
    this.StartedWatching = false;

  }

  async getCanContinue(noMovie:number):Promise<number>{
    return await new Promise((response, request) => {
      this.communication.getCanContinue(noMovie, this.session.mail).subscribe((res) => {
        console.log(res);
        try {
          response(res as number)
        } catch(err) {
          request(err);
        }
      });
    })
  }

  continue(doContinue: boolean){
    if(doContinue) this.timer.setMin(this.whereToContinue);
    this.canContinue = false;
  }

}
