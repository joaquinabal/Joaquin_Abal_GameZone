// src/app/componentes/juegos/juegos/juegos.routes.ts
import { Routes } from '@angular/router';

export const juegosRoutes: Routes = [
  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('../../mayoromenor/mayoromenor/mayoromenor.component').then(m => m.MayorMenorComponent)
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('../../ahorcado/ahorcad/ahorcad.component').then(m => m.AhorcadoComponent)
  },
  {
    path: 'diezmil',
    loadComponent: () =>
      import('../../diezmil/diezmil.component').then(m => m.DiezmilComponent)
  },
  {
        path: 'preguntados',
    loadComponent: () =>
      import('../../pokemon-trivia/pokemon-trivia.component').then(m => m.PokemonTriviaComponent)
  }
];
