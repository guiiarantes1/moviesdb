
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

apiKey = environment.apiKey;
base_Url = environment.urlBase;

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<any>{
    return this.httpClient.get(this.base_Url + 'movie/popular?api_key=' + this.apiKey+ '&language=pt-BR')
  }

}
