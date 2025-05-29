import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiezMilService } from '../../services/diezmil/diezmil.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    } else {
      this.mensaje = 'Te plantaste. Turno nuevo.';
      this.game.startTurn();
      this.dados = [];
    }
  }

  getImagen(dado: number): string {

    return `assets/dice${dado}.png`;
  }
}
