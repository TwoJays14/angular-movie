import { Component, OnInit } from '@angular/core';
import { Movie, Movies } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  card!: Movies;
  cardSubscription: Subscription | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.cardSubscription = this.movieService
      .getAllMovies()
      .subscribe((movies) => {
        console.log(movies);
        this.card = movies;
        console.log(this.card);
        
      });
  }
}
