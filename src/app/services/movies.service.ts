import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, Movies } from '../models/movie.model';
import { environment } from '../../environments/environment.development';

const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

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
      `${BASE_URL}/titles${pageIndex ? `/?page=${pageIndex}` : ''}`,
      {
        headers: {
          Accept: 'application/json',
          'X-RapidAPI-Key': `${environment['apiKey']}`,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      }
    );
  }
}
