import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../interfaces/movie";
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number = 1;

  constructor() { }

  ngOnInit() {
  }

  backdropStyle = () => ({
    'bakground': `linear-gradient(180deg, rgba(0,0,0,0.7), transparent), url(${this.movie.backdropUrl})`,
    'background-size': 'cover'
  })

  animationDelay = () => ({
    'animation-delay' : `${this.index * 0.3}s`
  })

}
