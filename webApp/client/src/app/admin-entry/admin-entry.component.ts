import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-entry',
    templateUrl: './admin-entry.component.html',
    styleUrls: ['./admin-entry.component.scss'],
})
export class AdminEntryComponent {

    constructor(private router: Router){

    }

    registerUserPage(){
        this.router.navigate(['/admin/register/users']);
    }

    viewUsersPage(){
        this.router.navigate(['admin/view/users']);
    }

    registerMoviePage(){
        this.router.navigate(['/admin/register/movies']);
    }

    viewMovies(){
        this.router.navigate(['/admin/view/movies']);
    }

    backToLoginPage(){
        this.router.navigate(['/']);
    }

}
