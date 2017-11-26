import { Injectable } from '@angular/core';
import {observable} from "rxjs/symbol/observable";
import {Subject} from "rxjs/Subject";
import {Movie} from "../interfaces/movie";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class MovieService {
  private selectedMovie: Subject<Movie> = new Subject();
  private apiKey: string = "459dc0a6677307b35e99da59345be68c";
  private baseApiUrl: string = "https://api.themoviedb.org/3/search/movie";
  private baseConfigurationUrl: string = 'https://api.themoviedb.org/3/configuration';
  private imageBaseUrl: string = '';
  private imageSizes: { backdrop?: string[], poster?: string[]} = {};

  constructor(private http: HttpClient) {
    this.setImageConfiguration();
  }

  get currentMovies(){
    return this.selectedMovie;
  }

  searchMovie(query: string) {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get<any>(this.baseApiUrl, {params})
      .map( response =>
        response.results.map((result: Movie) => {
          return {
            ...result,
            backdropUrl: this.createPhotoUrl(result.backdrop_path, true),
            posterUrl: this.createPhotoUrl(result.poster_path, false)
          }
    })
      );
  }

  changeCurrentMovies(movie: Movie) {
    this.selectedMovie.next(movie);
  }

  setImageConfiguration() {
    const params = new HttpParams().set('api_key', this.apiKey);
    this.http.get<any>(this.baseConfigurationUrl, {params})
      .map(response => response)
      .subscribe(config => {
        this.imageBaseUrl = config.images.base_url;
        this.imageSizes = {
          backdrop: config.images.backdrop_sizes,
          poster: config.images.poster_sizes
        };
        console.log(this.imageBaseUrl);
        console.log(this.imageSizes);
      });
  }

  createPhotoUrl(path: string, isBackdrop: boolean) {
    if (!path) {
      return "";
    }

    const {backdrop, poster} = this.imageSizes;
    const imageSize = isBackdrop ? backdrop[0] : poster[poster.length - 1];

    return `${this.imageBaseUrl}${imageSize}${path}`;
  }
}
