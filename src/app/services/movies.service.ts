import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, Movies } from '../models/movie.model';

const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

@Injectable({
  providedIn: 'root',
})
export class MoviesService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAllMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${BASE_URL}/titles`, {
      headers: {
        Accept: 'application/json',
        'X-RapidAPI-Key': '4b9d484babmshfd69ad9d88f81aap1357c3jsnaa7d77846c6c',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    });
  }
}
