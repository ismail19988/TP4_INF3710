import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './Movie';

@Injectable({
    providedIn: 'root',
})
export class ServerCommunicationService {
    private readonly BASE_URL: string = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    authentificationRequest(data: { mail: string, password: string} ) {
        return this.http
            .post<{ title: string; body: string }>(this.BASE_URL + '/auth', data)
            .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    registerRequest(userData: {
        fName: string,
        lName: string,
        mail: string,
        password: string,
        adress: string,
        postalCode: string,
        price: string,
        date: String,
        membreMensuel: boolean
    }) {
        return this.http
            .post<{ title: string; body: string }>(this.BASE_URL + '/auth/reg', userData)
            .pipe(catchError(this.handleError<string>('Registering error')));
    }

    registerMovie(movieData: {
        title: string,
        type: string,
        productionDate: string,
        lenght: number,
    }){
        return this.http
        .post<{ title: string; body: string }>(this.BASE_URL + '/movie/reg', movieData)
        .pipe(catchError(this.handleError<string>('Registering error')));
    }

    getMovie(title:string) {
        return this.http
            .post<{ title: string; body: Movie }>(this.BASE_URL + '/movie', title)
            .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    getAllMovies() {
        return this.http
            .get<{ title: string; movies: Movie[] }>(this.BASE_URL + '/movie/all')
            .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    getCanContinue(noMovie: number, mail: string) {
        return this.http
            .post<number>(this.BASE_URL + '/movie/continue', { noFilm: noMovie, courriel:mail })
            .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    saveMovieTime(noMovie: number, mail: string, min: number) {
        return this.http
            .post<{ title: string; body: string }>(this.BASE_URL + '/movie/savetime', { noFilm: noMovie, courriel: mail, min: min })
            .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    updateMovie(movie: Movie){
        console.log(movie.lenghtMins)
        return this.http
        .post<{ title: string; body: string }>(this.BASE_URL + '/movie/update', { noFilm: movie.noMovie, title: movie.title, type:movie.type, productionDate:movie.productionDate.substr(0,10) , lenght: movie.lenghtMins })
        .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    deleteMovie(noMovie: number){
        return this.http
        .post<{ title: string; body: string }>(this.BASE_URL + '/movie/delete', {body:noMovie})
        .pipe(catchError(this.handleError<string>('Authentification error')));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }

}
