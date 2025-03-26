import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';  // Asegúrate de que la ruta sea correcta


export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'poke', component: PokemonListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];