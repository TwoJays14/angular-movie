import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Genres, Movie, Movies } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  card!: Movies;
  genreList!: Genres;
  cardSubscription: Subscription | undefined;
  genreSubscription: Subscription | undefined;
  length = 1000;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent | undefined;

  showFiller: boolean = true;
  toggleMargin: boolean = false;

  toggleDrawer() {
    // Your additional logic here
    this.drawer.toggle();
    this.toggleMargin = !this.toggleDrawer;

    // More logic after toggle, if needed
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.movieService.getAllMovies(this.pageIndex).subscribe((movies) => {
      this.card = movies;
    });
  }

  newGenre(changedGenre: string) {
    console.log('home component genre', changedGenre);
    this.movieService.filterByGenre(changedGenre).subscribe((genre) => {
      this.card = genre;
    });
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

    this.genreSubscription = this.movieService
      .getMovieGenres()
      .subscribe((genres) => {
        console.log(genres);
        this.genreList = genres;
      });
  }

  ngOnDestroy(): void {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }

    if (this.genreSubscription) {
      this.genreSubscription.unsubscribe();
    }
  }
}
