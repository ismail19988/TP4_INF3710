import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { AdminMemberAddingComponent } from './admin-member-adding/admin-member-adding.component';
import { AdminMoviesViewComponent } from './admin-movies-view/admin-movies-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminEntryComponent },
  { path: 'movies', component: MoviesViewComponent },
  { path: 'admin/register/users', component: AdminMemberAddingComponent },
  { path: 'admin/view/movies', component: AdminMoviesViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
