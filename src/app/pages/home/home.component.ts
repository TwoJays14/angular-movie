import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, Movies } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  card!: Movies;
  cardSubscription: Subscription | undefined;
  length = 1000;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.movieService.getAllMovies(this.pageIndex).subscribe((movies) => {
      this.card = movies
    })
    
  }

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

  ngOnDestroy(): void {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }
  }
}
