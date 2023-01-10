import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { DetalhesFilmeComponent } from './detalhes-filme/detalhes-filme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesSerieComponent } from './detalhes-serie/detalhes-serie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes/:id', component: DetalhesFilmeComponent },
  { path: 'serie/:id', component: DetalhesSerieComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'search/:query', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
