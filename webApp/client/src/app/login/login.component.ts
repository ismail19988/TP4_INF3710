import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';

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

    constructor(private communication: ServerCommunicationService) {}

    ngOnInit() {}

    public async connect() {
        this.stateRef.nativeElement.innerHTML = 'En attente du serveur...';
        this.communication.authentificationRequest(this.mailRef.nativeElement.value, this.passRef.nativeElement.value).subscribe(res => {
                let serverResponse =  res as {title:string, body:string};
                let message  = "";
                try {
                    if (serverResponse.title === 'success') {
                        message += 'Connection réussie. ' + serverResponse.body;
                    } else if (serverResponse.title === 'badUsername') {
                        message += 'Courriel ou mot de passe Incorrect.';
                    } else if (serverResponse.title === 'Error') {
                        message += "Erreur de communcation avec le serveur code de l'erreur: " + serverResponse.body;
                    }
                } catch(erreur) {
                    console.log(erreur);
                    message += "Le serveur est déconnecté. Connexion Impossible"
                }
                this.stateRef.nativeElement.innerHTML = message;
            });
    }

}
