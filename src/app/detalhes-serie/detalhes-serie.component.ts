import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FilmesService } from '../services/filmes.service';

@Component({
  selector: 'app-detalhes-serie',
  templateUrl: './detalhes-serie.component.html',
  styleUrls: ['./detalhes-serie.component.scss']
})
export class DetalhesSerieComponent implements OnInit {
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
  crew!: any[];
  recomendacaoId: any;

  constructor(
    private filmesService: FilmesService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.filmeId = params['id']));
  }

  ngOnInit(): void {
    this.filmesService.getDetailsSerie(this.filmeId).subscribe((response: any) => {
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
      .getRecomendationsSerie(this.filmeId)
      .subscribe((response: any) => {
        this.recomendacoes = response.results;
        console.log(this.recomendacoes);
      });

    this.filmesService.getCreditsSerie(this.filmeId).subscribe((response: any) => {
      this.credits = response.cast;
      this.casts = response.crew;
      console.log(this.credits);
    });

    this.filmesService.getVideoSerie(this.filmeId).subscribe((response: any) => {
      this.videos = response.results;
      this.updateVideoUrl(this.videos[0].key);
    });

    this.filmesService
      .getReleaseDateSerie(this.filmeId)
      .subscribe((response: any) => {
        this.releaseDate = response.results.find(
          (result: any) => result.iso_3166_1 == 'BR'
        ).rating;

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
  voltar() {
    window.history.back();
  }
  redirectRecomendation(media:any, id:any){
    if(media == 'movie'){
      this.router.navigate(['','detalhes', id]).then(nav => {
        window.location.reload();});
    } else{
      this.router.navigate(['','serie', id]).then(nav => {
        window.location.reload();});
    }
  }
}
