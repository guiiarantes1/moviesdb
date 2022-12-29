
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

  getDetails(id:any): Observable<any>{
    return this.httpClient.get(this.base_Url+ '/movie/'+ id + '?api_key=' + this.apiKey + '&language=pt-BR')

  }

  getMovies(pageNumber:any): Observable<any>{
    return this.httpClient.get(this.base_Url + 'movie/popular?api_key=' + this.apiKey+ '&language=pt-BR&page=' + pageNumber)
  }

  getRecomendations(id:any): Observable<any>{
    return this.httpClient.get(this.base_Url+ '/movie/'+ id + '/recommendations?api_key=' + this.apiKey + '&language=pt-BR')
  }

  getCredits(id:any): Observable<any>{
    return this.httpClient.get(this.base_Url+ '/movie/'+ id + '/credits?api_key=' + this.apiKey + '&language=pt-BR')
  }

  getVideo(id:any): Observable<any>{
    return this.httpClient.get(this.base_Url+ '/movie/'+ id + '/videos?api_key=' + this.apiKey + '&language=pt-BR')
  }

 getReleaseDate(id:any):Observable<any>{
  return this.httpClient.get(this.base_Url+ '/movie/' + id + '/release_dates?api_key=' + this.apiKey)

 }

}
