import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerCommunicationService } from '../services/index/server-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-movie-adding',
  templateUrl: './admin-movie-adding.component.html',
  styleUrls: ['./admin-movie-adding.component.scss']
})
export class AdminMovieAddingComponent implements OnInit {

  @ViewChild('state', { static: false })
  private stateRef: ElementRef<HTMLHeadElement>;

  @ViewChild('title', { static: false })
  private title: ElementRef<HTMLInputElement>;

  @ViewChild('type', { static: false })
  private type: ElementRef<HTMLInputElement>;

  @ViewChild('productionDate', { static: false })
  private productionDateRef: ElementRef<HTMLInputElement>;

  @ViewChild('lenght', { static: false })
  private lenghtRef: ElementRef<HTMLInputElement>;

  public membreMensuel: boolean = true;

  constructor(private communication: ServerCommunicationService, private router: Router) { }

  ngOnInit() {}

  register() {
      this.stateRef.nativeElement.innerHTML = '[En attente du serveur...]';
      const movieData = {
          title: this.title.nativeElement.value,
          type: this.type.nativeElement.value,
          productionDate: this.productionDateRef.nativeElement.value,
          lenght: +this.lenghtRef.nativeElement.value,
      };

      this.communication.registerMovie(movieData).subscribe(res => {
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

  navigateOptionPage(){
    this.router.navigate(['/admin']);
  }
  

}
