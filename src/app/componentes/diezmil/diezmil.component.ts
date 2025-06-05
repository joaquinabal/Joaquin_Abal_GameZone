import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiezMilService } from '../../services/diezmil/diezmil.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");


@Component({
  selector: 'app-diezmil',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './diezmil.component.html',
  styleUrls: ['./diezmil.component.scss']
})
export class DiezmilComponent {
  dados: number[] = [];
  mensaje = '';
  juegoTerminado = false;

  constructor(public game: DiezMilService) {
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.game.resetGame();
    this.mensaje = '';
    this.juegoTerminado = false;
    this.game.startTurn();
    this.dados = [];
  }

  tirarDados() {
    const valido = this.game.continueTurn();
    this.dados = this.game.lastRoll;

    if (!valido) {
      this.mensaje = 'Turno perdido. No sumaste puntos.';
      if (this.game.totalScore >= this.game.maxScore) {
        this.juegoTerminado = true;
      } else {
        this.game.startTurn(); // Iniciar nuevo turno
      }
    } else {
      this.mensaje = '¡Buen tiro! Puedes seguir o plantarte.';
    }
  }

  plantarse() {
    const pudoPlantarse = this.game.plantarse();
    if (!pudoPlantarse) {
      this.mensaje = 'No puedes plantarte, superarías los 10.000 puntos.';
    } else if (this.game.isGameOver()) {
  this.mensaje = `¡Ganaste! Puntaje final: ${this.game.getFinalScore()}`;
  this.juegoTerminado = true;
  this.guardarPuntaje('diezmil', this.game.getFinalScore());
    } else {
      this.mensaje = 'Te plantaste. Turno nuevo.';
      this.game.startTurn();
      this.dados = [];
    }
  }

  getImagen(dado: number): string {

    return `assets/dice${dado}.png`;
  }

async guardarPuntaje(juego: string, puntaje: number) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error('Error al obtener el usuario autenticado:', error);
    return;
  }

  const usuario = data.user.email || data.user.id;
  console.log(usuario);
  const { error: insertError } = await supabase
    .from('puntuacion')
    .insert([{ usuario, juego, puntaje, fecha: new Date().toISOString() }]);

  if (insertError) {
    console.error('Error al guardar el puntaje:', insertError.message);
  } else {
    console.log('Puntaje guardado correctamente');
  }
}


}
