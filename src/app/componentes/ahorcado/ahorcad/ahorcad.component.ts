import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcad.component.html',
  styleUrls: ['./ahorcad.component.scss']
})
export class AhorcadoComponent implements OnInit {
  palabras = ['ANGULAR', 'JAVASCRIPT', 'BOOTSTRAP', 'RIQUELME'];
  palabraSecreta: string = '';
  letrasMostradas: string[] = [];
  letrasDisponibles: string[] = [];
  vidas: number = 3;
  imagenActual: string = '';
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasMostradas = Array(this.palabraSecreta.length).fill('_');
    this.letrasDisponibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.vidas = 7;
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.actualizarImagen();
  }

  adivinar(letra: string) {
    if (this.juegoTerminado) return;

    this.letrasDisponibles = this.letrasDisponibles.filter(l => l !== letra);

    if (this.palabraSecreta.includes(letra)) {
      this.palabraSecreta.split('').forEach((char, idx) => {
        if (char === letra) this.letrasMostradas[idx] = letra;
      });

      if (!this.letrasMostradas.includes('_')) {
        this.juegoTerminado = true;
        this.mensajeFinal = '¡Ganaste!';
      }
    } else {
      this.vidas--;
      this.actualizarImagen();
      if (this.vidas < 0) {
        this.juegoTerminado = true;
        this.mensajeFinal = `¡Perdiste! La palabra era: ${this.palabraSecreta}`;
      }
    }
  }

  actualizarImagen() {
    this.imagenActual = `assets/ahorcado${7 - this.vidas}.png`; // asegúrate de tener ahorcado0.png hasta ahorcado7.png
  }
}
