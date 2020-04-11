import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Router } from '@angular/router';
import { ValidationService } from '../services/index/validation.service';

@Component({
  selector: 'app-admin-member-adding',
  templateUrl: './admin-member-adding.component.html',
  styleUrls: ['./admin-member-adding.component.scss']
})
export class AdminMemberAddingComponent implements OnInit {

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

  public membreMensuel: boolean = true;

  constructor(private communication: ServerCommunicationService, private router: Router, private validation:ValidationService) { }

  ngOnInit() {}

  register() {
      if(this.validate()) {
        this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';

        const userData = {
            fName: this.fName.nativeElement.value,
            lName: this.lName.nativeElement.value,
            mail: this.mailRef.nativeElement.value,
            password: this.passRef.nativeElement.value,
            adress: this.address.nativeElement.value,
            postalCode: this.postalCode.nativeElement.value,
            price: this.price.nativeElement.value,
            date: this.date.nativeElement.value,
            membreMensuel: this.membreMensuel,
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
    } else {
        console.log('non');
    }
  }

  validate(): boolean {    
    if(!this.validation.validateNotNull(this.lName.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = '[Veuillez Entrer le nom du membre]';
        return false;
    }

    if(!this.validation.validateNotNull(this.fName.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = '[Veuillez Entrer le prenom du membre]';
        return false;
    }

    if(!this.validation.validateEmail(this.mailRef.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = '[Veuillez Entrer une adresse mail valide]';
        return false;
    }

    if(!this.validation.validateNotNull(this.passRef.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = '[Veuillez Entrer le mot de passe du membre]';
        return false;
    }

    if(!this.validation.validateNotNull(this.address.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = "[Veuillez Entrer l'adresse du membre]";
        return false;
    }

    if(this.validation.validatePostalCode(this.postalCode.nativeElement.value)){
        this.stateRef.nativeElement.innerHTML = "[Veuillez Entrer un code postal a 6 caracteres valide]";
        return false;
    }

    if(!this.validation.validateDate(this.date.nativeElement.value) && this.membreMensuel){
        this.stateRef.nativeElement.innerHTML = "[Veuillez Entrer une date d'echehance valide]";
        return false;
    }

    if((!this.validation.validateNotNull(this.price.nativeElement.value) || !this.validation.validateNumber(this.price.nativeElement.value))  && this.membreMensuel){
        this.stateRef.nativeElement.innerHTML = "[Veuillez Entrer un prix d'abonnement valide]";
        return false;
    }


    return true;

  }

  navigateConnectionPage() {
      this.router.navigate(['/']);
  }

  navigateOptionPage(){
    this.router.navigate(['/admin']);
  }
  

  public switchMember(vMember: boolean) {
      this.membreMensuel = vMember;
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
