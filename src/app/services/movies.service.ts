import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genres, Movie, Movies } from '../models/movie.model';
import { environment } from '../../environments/environment.development';

export const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

@Injectable({
  providedIn: 'root',
})
export class MoviesService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (environment.production) {
      console.log('We are running in production mode');
      console.log(`API Key: ${environment.apiKey}`);
    } else {
      console.log('We are running in development mode');
      console.log(`API Key: ${environment.apiKey}`);
    }
  }

  getAllMovies(pageIndex?: number): Observable<Movies> {
    return this.http.get<Movies>(
      `${BASE_URL}/titles?startYear=2000&limit=50${
        pageIndex ? `&page=${pageIndex}` : ''
      }`,
      {
        headers: {
          Accept: 'application/json',
          'X-RapidAPI-Key': `${environment['apiKey']}`,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      }
    );
  }

  getMovieGenres(): Observable<Genres> {
    return this.http.get<Genres>(`${BASE_URL}/titles/utils/genres`, {
      headers: {
        Accept: 'application/json',
        'X-RapidAPI-Key': `${environment['apiKey']}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    });
  }

  filterByGenre(genre: string, pageIndex = 1): Observable<Movies> {
    return this.http.get<Movies>(
      `${BASE_URL}/titles?genre=${genre}&startYear=2000&limit=50&page=${pageIndex}`,
      {
        headers: {
          Accept: 'application/json',
          'X-RapidAPI-Key': `${environment['apiKey']}`,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      }
    );
  }

  searchMovie(searchValue: string, pageIndex = 1): Observable<any> {
    const result = this.http.get<any>(
      `${BASE_URL}/titles/search/title/${searchValue}?exact=false&limit=50&page=${pageIndex}`,
      {
        headers: {
          Accept: 'application/json',
          'X-RapidAPI-Key': `${environment['apiKey']}`,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      }
    );

    console.log(searchValue);
    console.log(result);
    return result;
  }
}
