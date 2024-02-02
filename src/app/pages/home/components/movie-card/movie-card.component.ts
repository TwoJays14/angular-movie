import { Component, Input } from '@angular/core';
import { Movie, Movies } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() card!: Movies;
}
