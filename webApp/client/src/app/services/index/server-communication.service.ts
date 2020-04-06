import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
