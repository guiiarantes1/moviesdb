
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

apiKey = 'b75df51b77a191dfd2dc70635cf469f2';
base_Url = 'https://api.themoviedb.org/3';


  constructor(private httpClient: HttpClient) { }

  getDetails(id:any): Observable<any>{
    return this.httpClient.get(this.base_Url+ '/movie/'+ id + '?api_key=' + this.apiKey + '&language=pt-BR')
    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    //https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
  }

  getMovies(pageNumber:any): Observable<any>{
    return this.httpClient.get(this.base_Url + '/trending/all/day?api_key=' + this.apiKey+ '&language=pt-BR&page=' + pageNumber)
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

 getGenres():Observable<any>{
  return this.httpClient.get(this.base_Url + '/genre/movie/list?api_key=' + this.apiKey + '&language=pt-BR')
 }

 getProfile(id:any):Observable<any>{
  return this.httpClient.get(this.base_Url + '/person/'+id+'?api_key=' + this.apiKey + '&language=pt-BR')
 }

 getProfileMovies(id:any):Observable<any>{
  return this.httpClient.get(this.base_Url +'/person/'+ id + '/combined_credits?api_key=' + this.apiKey + '&language=pt-BR')
 }

 getProfileExternalIds(id:any):Observable<any>{
  return this.httpClient.get(this.base_Url +'/person/'+ id + '/external_ids?api_key=' + this.apiKey + '&language=pt-BR')
 }

 getSearch(filtro:any, pageNumber:any):Observable<any>{
  return this.httpClient.get(this.base_Url + '/search/multi?api_key=' + this.apiKey + '&language=pt-BR&query=' + filtro + '&page='+pageNumber+'&include_adult=false')
}
/////////////// SERIES ///////////

getDetailsSerie(id:any): Observable<any>{
  return this.httpClient.get(this.base_Url+ '/tv/'+ id + '?api_key=' + this.apiKey + '&language=pt-BR')
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
}

getSerie(pageNumber:any): Observable<any>{
  return this.httpClient.get(this.base_Url + '/trending/all/week?api_key=' + this.apiKey+ '&language=pt-BR&page=' + pageNumber)
}

getRecomendationsSerie(id:any): Observable<any>{
  return this.httpClient.get(this.base_Url+ '/tv/'+ id + '/recommendations?api_key=' + this.apiKey + '&language=pt-BR')
}

getCreditsSerie(id:any): Observable<any>{
  return this.httpClient.get(this.base_Url+ '/tv/'+ id + '/credits?api_key=' + this.apiKey + '&language=pt-BR')
}

getVideoSerie(id:any): Observable<any>{
  return this.httpClient.get(this.base_Url+ '/tv/'+ id + '/videos?api_key=' + this.apiKey + '&language=pt-BR')
}

getReleaseDateSerie(id:any):Observable<any>{
return this.httpClient.get(this.base_Url+ '/tv/' + id + '/content_ratings?api_key=' + this.apiKey)
}

getGenresSerie():Observable<any>{
return this.httpClient.get(this.base_Url + '/genre/tv/list?api_key=' + this.apiKey + '&language=pt-BR')
}


}






