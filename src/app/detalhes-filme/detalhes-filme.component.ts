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
  videoUrl!: any;
  filmeId: any;
  genres: any;
  casts!: any[];
  releaseDate!: string;
  classification = '';
  nota!: string;

  constructor(
    private filmesService: FilmesService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.filmeId = params['id']));
  }

  ngOnInit(): void {
    this.filmesService.getDetails(this.filmeId).subscribe((response: any) => {
      this.detalhes = response;
      this.genres = this.detalhes.genres
        .map((genre: any) => genre.name)
        .join(', ');

      if (this.detalhes.vote_average >= 7) {
        this.nota = 'spinner-container-bom';
      } else if (
        this.detalhes.vote_average >= 4 &&
        this.detalhes.vote_average < 7
      ) {
        this.nota = 'spinner-container-medio';
      } else {
        this.nota = 'spinner-container-ruim';
      }
    });

    this.filmesService
      .getRecomendations(this.filmeId)
      .subscribe((response: any) => {
        this.recomendacoes = response.results;
      });

    this.filmesService.getCredits(this.filmeId).subscribe((response: any) => {
      this.credits = response.cast;
      this.casts = response.crew;
    });

    this.filmesService.getVideo(this.filmeId).subscribe((response: any) => {
      this.videos = response.results;
      this.updateVideoUrl(this.videos[0].key);
    });

    this.filmesService
      .getReleaseDate(this.filmeId)
      .subscribe((response: any) => {
        this.releaseDate = response.results.find(
          (result: any) => result.iso_3166_1 == 'BR'
        ).release_dates[0].certification;

        if (this.releaseDate[0] == undefined || this.releaseDate[0] == null) {
          this.classification = 'Classificação Livre';
        } else {
          this.classification = this.releaseDate! + ' anos';
        }
      });
  }

  updateVideoUrl(key: string) {
    const dangerousVideoUrl = 'https://www.youtube.com/embed/' + key;
    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }

  converterHora(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + 'h ' + minutes + 'm';
  }
}
