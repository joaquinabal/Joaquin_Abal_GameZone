import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from '../../mayoromenor/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from '../../ahorcado/ahorcad/ahorcad.component';
import { DiezmilComponent } from '../../diezmil/diezmil.component';
import { PokemonTriviaComponent } from '../../pokemon-trivia/pokemon-trivia.component';

const routes: Routes = [
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'diezmil', component: DiezmilComponent },
    { path: 'preguntados', component: PokemonTriviaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}
