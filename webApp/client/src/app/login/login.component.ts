import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    @ViewChild('mail', { static: false })
    mailRef: ElementRef<HTMLInputElement>;

    @ViewChild('password', { static: false })
    passRef: ElementRef<HTMLInputElement>;

    @ViewChild('state', { static: false })
    public stateRef: ElementRef<HTMLHeadElement>;

    private readonly BASE_URL: string = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    ngOnInit() {}

    public async connect() {
        this.stateRef.nativeElement.innerHTML = 'En attente du serveur...';
        this.http
            .post<boolean>(this.BASE_URL + '/auth', { username: this.mailRef.nativeElement.value, password: this.passRef.nativeElement.value })
            .pipe(catchError(this.handleError<string>('Authentification error')))
            .subscribe(res => {
                if (res) {
                    this.stateRef.nativeElement.innerHTML = 'connexion reussie';
                } else {
                    this.stateRef.nativeElement.innerHTML = 'Courriel ou mot de passe incorrect';
                }
            });
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
