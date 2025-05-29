import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private pokemonList = ['ditto', 'pikachu', 'tauros', 'swampert', 'mew', 'elekid', 'treecko', 'spinda', 'lapras', 'bulbasaur'];

  constructor(private http: HttpClient) {}

  getPokemonData() {
    const requests = this.pokemonList.map(name => this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
    return forkJoin(requests);
  }
}