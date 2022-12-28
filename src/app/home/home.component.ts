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


  imgBaseUrl = environment.urlImgBase

  constructor(private filmesService: FilmesService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filmesService.getMovies().subscribe((response: any) => {
      console.log(response);
      this.filmes = response.results;

    });
  }


}
