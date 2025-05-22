import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from '../../mayoromenor/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from '../../ahorcado/ahorcad/ahorcad.component';

const routes: Routes = [
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'ahorcado', component: AhorcadoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}
