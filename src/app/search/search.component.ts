import { Component, OnInit } from '@angular/core';
import {Movie} from "../interfaces/movie";
import {MovieService} from "../services/movie.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: Movie[] = [];
  search$: Subject<string> = new Subject();
  fetching: boolean = false;
  search: string;

  constructor(private service: MovieService) { }

  ngOnInit() {
    this.search$
      .debounceTime(500)
      .map(query => {
        this.fetching = true;
        return query;
      })
      .subscribe(this.searchQuery.bind(this));
  }

  searchQuery(query: string) {
    if (query.length > 2) {
      this.service.searchMovie(query)
        .subscribe(resultss => {
          this.fetching = false;
          this.searchResult = resultss;
        });
    }
    else {
      this.fetching = false;
      this.searchResult = [];
    }
  }
  setCurrentMovie(movie: Movie) {
    this.service.changeCurrentMovies(movie);
  }
}
