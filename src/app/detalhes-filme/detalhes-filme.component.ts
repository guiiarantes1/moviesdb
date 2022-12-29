import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FilmesService } from './../services/filmes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.scss'],
})
export class DetalhesFilmeComponent implements OnInit {
  recomendacoes!: any[];
  credits!: any[];
  videos!: any[];
  detalhes!: any;
  imgBaseUrl = environment.urlImgBase;
  trailerBaseUrl = 'https://www.youtube.com/watch?v=';
  videoUrl!: any;
  filmeId:any;
  genres:any;
  casts!: any[];
  releaseDate!:any[];



  constructor(private filmesService: FilmesService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.filmeId = params['id']);
  }

  ngOnInit(): void {
    this.filmesService.getDetails(this.filmeId).subscribe((response: any) => {
      console.log(response);
      this.detalhes = response;
      this.genres = this.detalhes.genres.map((genre:any)=> genre.name).join(", ")
    });

    this.filmesService.getRecomendations(this.filmeId).subscribe((response: any) => {
      console.log(response);
      this.recomendacoes = response.results;
    });

    this.filmesService.getCredits(this.filmeId).subscribe((response: any) => {
      console.log(response);
      this.credits = response.cast;
      this.casts = response.crew;
    });

    this.filmesService.getVideo(this.filmeId).subscribe((response: any) => {
      console.log(response);
      this.videos = response.results;
      this.updateVideoUrl(this.videos[0].key)
    });

    this.filmesService.getReleaseDate(this.filmeId).subscribe((response: any) => {
      console.log(response);
      this.releaseDate = response.results;
    });



  }

  updateVideoUrl(key: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    const dangerousVideoUrl = 'https://www.youtube.com/embed/' + key;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }


  converterHora(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + 'h ' + minutes + 'm';
  }


}
