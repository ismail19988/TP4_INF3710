import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Router } from '@angular/router';

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
    

    constructor(private communication: ServerCommunicationService, private router: Router) {}

    ngOnInit() {}

    public async connect() {
        this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';
        this.communication.authentificationRequest({ username: this.mailRef.nativeElement.value, password:this.passRef.nativeElement.value }).subscribe(res => {
                let serverResponse =  res as {title: string, body: string};
                let message  = "";
                try {
                    message+= serverResponse.body;
                }
                catch(err) {
                    message += "[Le serveur est déconnecté. Connexion Impossible]"
                }

                this.stateRef.nativeElement.innerHTML = message;
            });
    }

    public AdminEntry(){
        this.router.navigate(['/admin']);
    }
}
