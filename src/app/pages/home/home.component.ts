import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Genres, Movie, Movies } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  card!: Movies;
  genreList!: Genres;
  private sharedSubscription: Subscription | undefined;
  private cardSubscription: Subscription | undefined;
  private genreSubscription: Subscription | undefined;
  currentGenre: string | null = null;
  currentSearch: string | null = null;

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
    this.toggleMargin = !this.toggleMargin;

    // More logic after toggle, if needed
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if (this.currentSearch) {
    this.movieService.searchMovie(this.currentSearch, this.pageIndex).subscribe((movies) => {
      this.card = movies;
    });
  } else if (this.currentGenre) {
    this.movieService.filterByGenre(this.currentGenre, this.pageIndex).subscribe((movies) => {
      this.card = movies;
    });
  } else {
    this.movieService.getAllMovies(this.pageIndex).subscribe((movies) => {
      this.card = movies;
    });
  }}

  newGenre(changedGenre: string) {
    // console.log('home component genre', changedGenre);
    this.movieService.filterByGenre(changedGenre).subscribe((genre) => {
      this.card = genre;
    });
  }

  constructor(
    private movieService: MoviesService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.cardSubscription = this.movieService
      .getAllMovies()
      .subscribe((movies) => {
        // console.log(movies);
        this.card = movies;
        console.log(this.card);
      });

    this.genreSubscription = this.movieService
      .getMovieGenres()
      .subscribe((genres) => {
        // console.log(genres);
        this.genreList = genres;
      });

    this.sharedSubscription = this.sharedService.changeEmitted$.subscribe(
      (data) => {
        this.movieService.searchMovie(data).subscribe((searchResult) => {
          this.card = searchResult;
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }

    if (this.genreSubscription) {
      this.genreSubscription.unsubscribe();
    }

    if (this.sharedSubscription) {
      this.sharedSubscription.unsubscribe();
    }
  }
}
