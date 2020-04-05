import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.scss']
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


  constructor(private communication: ServerCommunicationService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';

    const userData = {
      fName: this.fName.nativeElement.value,
      lName: this.lName.nativeElement.value,
      username: this.mailRef.nativeElement.value,
      password: this.passRef.nativeElement.value,
      adress: this.address.nativeElement.value,
      postalCode: this.postalCode.nativeElement.value
    }

    this.communication.registerRequest(userData).subscribe(res => {
            let serverResponse =  res as {title:string, body:string};
            let message  = "";
            try {
              message += "[" + serverResponse.body + "]";
            }
            catch(err) {
              console.error(err);
              message += "[Le serveur est déconnecté. Enregistrement Impossible]"
            }

            this.stateRef.nativeElement.innerHTML = message;
  })
}

  navigateConnectionPage(){
    this.router.navigate(['/']);
  }

}
