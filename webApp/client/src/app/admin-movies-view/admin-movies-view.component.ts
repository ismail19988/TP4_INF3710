import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../services/index/Movie';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { ValidationService } from '../services/index/validation.service';

@Component({
  selector: 'app-admin-movies-view',
  templateUrl: './admin-movies-view.component.html',
  styleUrls: ['./admin-movies-view.component.scss']
})
export class AdminMoviesViewComponent implements AfterViewInit {

  private movies: Array<Movie> =  new Array<Movie>();
  private movie:Movie;

  @ViewChild('title', { static: false })
  private newTitle: ElementRef<HTMLInputElement>;

  @ViewChild('type', { static: false })
  private newType: ElementRef<HTMLInputElement>;

  @ViewChild('productionDate', { static: false })
  private newProductionDate: ElementRef<HTMLInputElement>;

  @ViewChild('lenght', { static: false })
  private newLenght: ElementRef<HTMLInputElement>;

  @ViewChild('state', { static: false })
  private stateRef: ElementRef<HTMLHeadElement>;


  constructor(private communication: ServerCommunicationService, private validation: ValidationService) { }

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
    let noMovie:number = +<string>elem.getAttribute('id');
    for(let movie of this.movies){
      if(movie.noMovie == noMovie){
        this.movie = movie;
      }
    }
  }

  async updateMovie() {

    if(this.validate()) {
      this.movie = new Movie(this.movie.noMovie,
      this.newTitle.nativeElement.value,
      this.newType.nativeElement.value,
      this.newProductionDate.nativeElement.value,
      +this.newLenght.nativeElement.value)
      await this.sendMovieData().then((res)=>{
        console.log('res', res);
        this.stateRef.nativeElement.innerHTML = '[' + res.body + ']'
      }).catch(() => {
        this.stateRef.nativeElement.innerHTML = '[le serveur est deconnecter. Action impossible]';
      });

      await this.getAllMovies().catch((err)=>{});
      setTimeout(() => {this.stateRef.nativeElement.innerHTML = '[]';},1000);
    }

  }

  async deleteCurrentMovie(){
    let sucess = false;
    await this.sendMovieToDelete(this.movie.noMovie).then((res)=>{
      this.stateRef.nativeElement.innerHTML = '['+ res.body + ']'
      sucess = true;
    }).catch((err) =>{
      this.stateRef.nativeElement.innerHTML = '[le serveur est deconnecter. Action impossible]';
    });

    await this.getAllMovies().catch((err)=>{});

    if(sucess)
    setTimeout(() => { delete(this.movie); }, 1000);
    else{
      setTimeout(() => {this.stateRef.nativeElement.innerHTML = '[]';},1000);
    }
  }

  async sendMovieToDelete(noMovie: number) : Promise<{ title: string, body: string }>{
    return await new Promise((response, req) => {
      this.communication.deleteMovie(this.movie.noMovie).subscribe((res) => {
        try {
          let serverAnswer = res as { title: string, body:string};
          response(serverAnswer);
        } catch(err) {
          req({ title: 'Fail', body: 'Le serveur est déconnecté' });
        }
      });
  });
  }

  async sendMovieData(): Promise<{ title: string, body: string }>{
    return await new Promise((response, req) => {
      this.communication.updateMovie(this.movie).subscribe((res) => {
        try {
          let serverAnswer = res as { title: string, body:string};
          response(serverAnswer);
        } catch(err) {
          req({ title: 'Fail', body: 'Le serveur est déconnecté' });
        }
      });
  });
  }

  private validate(): boolean{
    if(!this.validation.validateNotNull(this.newTitle.nativeElement.value)) {
      this.stateRef.nativeElement.innerHTML = '[Veuillez entrer un titre au film]';
      return false;
    }

    if(!this.validation.validateNotNull(this.newType.nativeElement.value)) {
      this.stateRef.nativeElement.innerHTML = '[Veuillez entrer un genre au film]';
      return false;
    }

    if(!this.validation.validateDate(this.newProductionDate.nativeElement.value)) {
      this.stateRef.nativeElement.innerHTML = '[Veuillez entrer la date de production du film (au format aaaa-mm-jj)]';
      return false;
    }
    
    if(!this.validation.validateNotNull(this.newLenght.nativeElement.value) || !this.validation.validateInteger(this.newLenght.nativeElement.value)) {
      this.stateRef.nativeElement.innerHTML = '[Veuillez entrer la durée du film (en minutes)]';
      return false;
    }

    return true;
  }

}
