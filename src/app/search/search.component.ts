import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FilmesService } from '../services/filmes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  imgBaseUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
  filmeId: any;

 query: any;
 filtrado:any;

  checkoutForm = this.formBuilder.group({
    filtro: '',
  });

  pageNumber: any = 1;
  conteudosSearch!: any[];

  constructor(
    private filmesService: FilmesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

  ) {
    this.route.params.subscribe((params) => (this.query = params['query']));
  }

  ngOnInit(): void {
    this.filmesService
      .getSearch(this.query, this.pageNumber)
      .subscribe((response: any) => {
        this.conteudosSearch = response.results;
        this.conteudosSearch.sort(
          (a: any, b: any) => b.vote_count - a.vote_count
        );
        console.log(this.conteudosSearch);
      });
  }

  voltar() {
    window.history.back();
  }

  onSubmit() {
    this.query = this.checkoutForm.value.filtro
    console.log(this.query );

    this.router.navigate(['','search', this.query]).then(nav => {
      window.location.reload();});
  }
  redirectSearch(media:any, id:any){
    if(media == 'movie'){
      this.router.navigate(['','detalhes', id]).then(nav => {
        window.location.reload();});
    } else{
      this.router.navigate(['','serie', id]).then(nav => {
        window.location.reload();});
    }
  }
}
