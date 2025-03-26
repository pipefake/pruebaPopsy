import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { MatCardModule } from '@angular/material/card';  

@Component({
  selector: 'app-pokemon-list',
  standalone: true,  
  imports: [CommonModule, MatCardModule],  
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100').subscribe((data: any) => {
      this.pokemons = data.results;
    });
  }
}