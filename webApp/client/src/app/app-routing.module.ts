import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { AdminMemberAddingComponent } from './admin-member-adding/admin-member-adding.component';
import { AdminMoviesViewComponent } from './admin-movies-view/admin-movies-view.component';
import { AdminMovieAddingComponent } from './admin-movie-adding/admin-movie-adding.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminEntryComponent },
  { path: 'movies', component: MoviesViewComponent },
  { path: 'admin/register/users', component: AdminMemberAddingComponent },
  { path: 'admin/movies/edit', component: AdminMoviesViewComponent },
  { path: 'admin/movies/add', component: AdminMovieAddingComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
