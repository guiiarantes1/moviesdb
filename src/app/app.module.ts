import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DetalhesFilmeComponent } from './detalhes-filme/detalhes-filme.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FilmesService } from './services/filmes.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProfileComponent } from './profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { OrderModule } from 'ngx-order-pipe';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalhesSerieComponent } from './detalhes-serie/detalhes-serie.component';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { FooterComponent } from './footer/footer.component';
registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetalhesFilmeComponent,
    ProfileComponent,
    SearchComponent,
    DetalhesSerieComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FilmesService, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
