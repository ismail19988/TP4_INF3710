import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-entry',
    templateUrl: './admin-entry.component.html',
    styleUrls: ['./admin-entry.component.scss'],
})
export class AdminEntryComponent implements OnInit {
    @ViewChild('state', { static: false })
    private stateRef: ElementRef<HTMLHeadElement>;

    @ViewChild('fName', { static: false })
    private fName: ElementRef<HTMLInputElement>;

    @ViewChild('lName', { static: false })
    private lName: ElementRef<HTMLInputElement>;

    @ViewChild('mail', { static: false })
    private mailRef: ElementRef<HTMLInputElement>;

    @ViewChild('password', { static: false })
    private passRef: ElementRef<HTMLInputElement>;

    @ViewChild('address', { static: false })
    private address: ElementRef<HTMLInputElement>;

    @ViewChild('postalCode', { static: false })
    private postalCode: ElementRef<HTMLInputElement>;

    @ViewChild('price', { static: false })
    private price: ElementRef<HTMLInputElement>;

    @ViewChild('date', { static: false })
    private date: ElementRef<HTMLInputElement>;

    @ViewChild('vMember', { static: false })
    private vMember: ElementRef<HTMLInputElement>;

    @ViewChild('aMember', { static: false })
    private aMember: ElementRef<HTMLInputElement>;

    public membreVisionnement: boolean = true;

    constructor(private communication: ServerCommunicationService, private router: Router) { }

    ngOnInit() {}

    register() {
        this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';

        const userData = {
            fName: this.fName.nativeElement.value,
            lName: this.lName.nativeElement.value,
            username: this.mailRef.nativeElement.value,
            password: this.passRef.nativeElement.value,
            adress: this.address.nativeElement.value,
            postalCode: this.postalCode.nativeElement.value,
            price: this.price.nativeElement.value,
            date: this.date.nativeElement.value,
            vMember: this.membreVisionnement,
        };

        this.communication.registerRequest(userData).subscribe(res => {
            let serverResponse = res as { title: string, body: string };
            let message = '';
            try {
                message += '[' + serverResponse.body + ']';
            } catch (err) {
                message += '[Le serveur est déconnecté. Enregistrement Impossible]';
            }

            this.stateRef.nativeElement.innerHTML = message;
        });
    }

    navigateConnectionPage() {
        this.router.navigate(['/']);
    }

    public switchMember(vMember: boolean) {
        this.membreVisionnement = vMember;
        if (vMember) {
            this.vMember.nativeElement.style.borderStyle = 'solid';
            this.vMember.nativeElement.style.borderColor = '#5cb85c';
            this.aMember.nativeElement.style.borderStyle = '';
            this.aMember.nativeElement.style.borderColor = '';
        } else {
            this.aMember.nativeElement.style.borderStyle = 'solid';
            this.aMember.nativeElement.style.borderColor = '#5cb85c';
            this.vMember.nativeElement.style.borderStyle = '';
            this.vMember.nativeElement.style.borderColor = '';
        }
    }
}
