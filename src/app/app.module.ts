import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DisplayMovieComponent} from "./display-movie/display-movie.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {SearchComponent} from "./search/search.component";
import {MoviePreviewComponent} from "./search/movie-preview/movie-preview.component";
import {FormsModule} from "@angular/forms";
import {MovieService} from "./services/movie.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    DisplayMovieComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    MoviePreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
