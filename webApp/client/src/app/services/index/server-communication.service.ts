import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  private readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authentificationRequest(username:string, password:string){
    return this.http
    .post<{title:string, body:string}>(this.BASE_URL + '/auth', { username: username, password: password})
    .pipe(catchError(this.handleError<string>('Authentification error')))
  }
  
  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
        return of(result as T);
    };
}
}
