import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from '../../ahorcado/ahorcad/ahorcad.component';
import { MayorMenorComponent } from '../../mayoromenor/mayoromenor/mayoromenor.component';
@NgModule({
  imports: [CommonModule,JuegosRoutingModule, AhorcadoComponent, MayorMenorComponent]
})
export class JuegosModule { }
