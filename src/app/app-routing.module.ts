import { HomeComponent } from './home/home.component';
import { DetalhesFilmeComponent } from './detalhes-filme/detalhes-filme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes', component: DetalhesFilmeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
