import GENRES from './../shared/genres';
import { environment } from 'src/environments/environment';
import { FilmesService } from './../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filmes!: any[];
  p: number = 1;
  filtros = Object.keys(GENRES);

  filmesFiltrados!: any[];
  imgBaseUrl = 'https://image.tmdb.org/t/p/original';
  filtroAtual!: string[];

  query: any;
  filtrado: any;

  checkoutForm = this.formBuilder.group({
    filtro: '',
  });

  pageNumber: any = 1;
  conteudosSearch!: any[];

  constructor(
    private filmesService: FilmesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filmesService.getMovies(this.p).subscribe((response: any) => {
      console.log(response);
      this.filmes = response.results;
      this.filmesFiltrados = this.filmes;
    });
    this.filtroAtual = [];
  }

  changePage(event: any) {
    this.p = event;
    this.filmesService.getMovies(this.p).subscribe((response: any) => {
      console.log(response);
      this.filmes = response.results;
      this.filmesFiltrados = this.filmes;
      if (this.filtroAtual.length !== 0) {
        this.filmesFiltrados = this.filmes.filter((filme) =>
          this.filtroAtual.some((filtro: any) =>
            filme.genre_ids.includes(GENRES[filtro])
          )
        );
        //   this.filtroAtual.some((filtro:any) =>
        //   filme.genre_ids.includes(filtro)
        // ));
      }
      console.log(this.filtroAtual);
    });
  }
  filtrar(filtro: string) {
    if (!this.filtroAtual.includes(filtro)) {
      this.filtroAtual.push(filtro);
      this.filmesFiltrados = this.filmes.filter((filme) =>
        this.filtroAtual.some((filtro: any) =>
          filme.genre_ids.includes(GENRES[filtro])
        )
      );
      console.log(this.filtroAtual);
      console.log(this.filmesFiltrados);
    } else {
      this.filtroAtual = this.filtroAtual.filter((f: string) => f !== filtro);
      this.filmesFiltrados = this.filmes.filter((filme) =>
        this.filtroAtual.every((filtro: any) =>
          filme.genre_ids.includes(GENRES[filtro])
        )
      );
      console.log(this.filtroAtual);
      console.log(this.filmesFiltrados);
    }
  }

  onSubmit() {
    this.query = this.checkoutForm.value.filtro;
    console.log(this.query);

    this.router.navigate(['', 'search', this.query]).then((nav) => {
      window.location.reload();
    });
  }
  goToShow(media: any, id: any) {
    if (media == 'movie') {
      this.router.navigate(['', 'detalhes', id]).then((nav) => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['', 'serie', id]).then((nav) => {
        window.location.reload();
      });
    }
  }
}
