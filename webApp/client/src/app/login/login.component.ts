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
        await this.getServerValidation().then((res) => {
            if(res)
                setTimeout(()=>{ this.router.navigate(['/movies']); }, 2000);
        }).catch((err)=>{
            console.log(err);
        });
    }

    async getServerValidation(): Promise<boolean> {
        this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';
        return new Promise((resolve, reject) => {
            this.communication.authentificationRequest({ mail: this.mailRef.nativeElement.value, password:this.passRef.nativeElement.value }).subscribe(res => {
                let serverResponse =  res as { title: string, body: string };
                let message  = "";
                try {
                    message += serverResponse.body;
                    resolve(serverResponse.title ==='Success');
                }
                catch(err) {
                    message += "[Le serveur est déconnecté. Connexion Impossible]"
                    reject(err);
                }
                this.stateRef.nativeElement.innerHTML = message;
            });

        });
    }


    public AdminEntry(){
        this.router.navigate(['/admin']);
    }
}
