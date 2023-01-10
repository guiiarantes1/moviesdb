import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from '../services/filmes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileId: any;
  profile: any;
  imgBaseUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
  imgMovieUrl = environment.urlImgBase;
  profileMovies!: any[];
  https = 'https://';
  externalIds: any;
  facebook_id = 'https://www.facebook.com/';
  instagram_id = 'https://www.instagram.com/';
  twitter_id = 'https://twitter.com/';
  atuacaoMovies!: any[];
  producaoMovies!: any[];
  displayedColumns: string[] = ['release_date', 'title'];
  producao:boolean = true;


  constructor(
    private filmesService: FilmesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.profileId = params['id']));
  }

  ngOnInit(): void {
    this.filmesService.getProfile(this.profileId).subscribe((response: any) => {
      this.profile = response;
      console.log(this.profile);
      if (this.profile.biography == '') {
        this.profile.biography =
          'Não encontramos biografia para ' + this.profile.name;
      }
      if (this.profile.gender == 1) {
        this.profile.gender = 'Feminino';
      } else if (this.profile.gender == 2) {
        this.profile.gender = 'Masculino';
      } else {
        this.profile.gender = 'Não Binário';
      }
      if (this.profile.known_for_department == 'Acting') {
        this.profile.known_for_department = 'Atuação';
      } else if (this.profile.known_for_department == 'Directing') {
        this.profile.known_for_department = 'Direção';
      }
    });

    this.filmesService
      .getProfileMovies(this.profileId)
      .subscribe((response: any) => {
        this.profileMovies = response.cast;
        this.profileMovies.sort(
          (a: any, b: any) => b.vote_count - a.vote_count
        );
        this.atuacaoMovies = response.cast.filter((filme:any) => filme.first_air_date || filme.release_date);
        this.atuacaoMovies.sort(
          (a: any, b: any) =>
            new Date(b.release_date || b.first_air_date).getTime() -
            new Date(a.release_date || a.first_air_date).getTime()
        );
        this.producaoMovies = response.crew.filter((filme:any) => filme.first_air_date || filme.release_date);
        this.producaoMovies.sort(
          (a: any, b: any) =>
            new Date(b.release_date || b.first_air_date).getTime() -
            new Date(a.release_date || a.first_air_date).getTime()

        );
        console.log(this.producaoMovies);
        if(this.producaoMovies.length == 0){
          this.producao = false
        } else{
          this.producao = true
        }

        console.log(this.atuacaoMovies);
      });

    this.filmesService
      .getProfileExternalIds(this.profileId)
      .subscribe((response: any) => {
        this.externalIds = response;

        console.log(this.externalIds);
      });
  }

  voltar() {
    window.history.back();
  }
}
