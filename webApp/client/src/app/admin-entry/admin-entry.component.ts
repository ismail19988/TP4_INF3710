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
        this.router.navigate(['admin/movies/add']);
    }

    viewMovies(){
        this.router.navigate(['admin/movies/edit']);
    }

    backToLoginPage(){
        this.router.navigate(['/']);
    }

}
