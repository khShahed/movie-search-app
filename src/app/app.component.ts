import { Component } from '@angular/core';
import {Movie} from "./interfaces/movie";
import {MovieService} from "./services/movie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMovie: Movie;

  constructor(private service: MovieService){
    this.service
      .currentMovies
      .subscribe( movie => {
        this.currentMovie = movie;
      });
  }

  startNewSearch() {
    this.service.changeCurrentMovies(null);
  }
}
