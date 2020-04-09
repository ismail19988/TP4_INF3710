import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { AdminMemberAddingComponent } from './admin-member-adding/admin-member-adding.component';
import { AdminMoviesViewComponent } from './admin-movies-view/admin-movies-view.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, AdminEntryComponent, MoviesViewComponent, AdminMemberAddingComponent, AdminMoviesViewComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
