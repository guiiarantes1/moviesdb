import GENRES from './../shared/genres';
import { environment } from 'src/environments/environment';
import { FilmesService } from './../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filmes!: any[];
  p: number = 1;
  filtros = [
    'Ação',
    'Aventura',
    'Animação',
    'Comédia',
    'Crime',
    'Documentário',
    'Drama',
    'Família',
    'Fantasia',
    'História',
    'Terror',
    'Música',
    'Mistério',
    'Romance',
    'Ficção científica',
    'Cinema TV',
    'Thriller',
    'Guerra',
    'Faroeste',
  ];

  filmesFiltrados!: any[];
  imgBaseUrl = environment.urlImgBase;
  filtroAtual!: string | null;

  constructor(
    private filmesService: FilmesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filmesService.getMovies(this.p).subscribe((response: any) => {
      console.log(response);
      this.filmes = response.results;
      this.filmesFiltrados = this.filmes;
    });
    this.filtroAtual = null;
  }

  changePage(event: any) {
    this.p = event;
    this.filmesService.getMovies(this.p).subscribe((response: any) => {
      console.log(response);
      this.filmes = response.results;
      this.filmesFiltrados = this.filmes;
      if (this.filtroAtual !== null) {
        this.filmesFiltrados = this.filmes.filter((filme) =>
          filme.genre_ids.includes(GENRES[this.filtroAtual || ''])
        );
      }
    });
  }

  filtrar(filtro: string) {
    if (this.filtroAtual === null) {
      this.filmesFiltrados = this.filmes.filter((filme) =>
        filme.genre_ids.includes(GENRES[filtro])
      );
      console.log(filtro);
      this.filtroAtual = filtro;
    } else {
      this.filtroAtual = null;
      this.filmesFiltrados = this.filmes;
    }
  }
}
