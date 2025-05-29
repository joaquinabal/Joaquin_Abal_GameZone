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
  letrasUsadas: string[] = [];
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
  this.letrasUsadas = [];
  this.vidas = 7;
  this.juegoTerminado = false;
  this.mensajeFinal = '';
  this.actualizarImagen();
}


  adivinar(letra: string) {
    
    this.letrasUsadas.push(letra);

    if (this.juegoTerminado) return;   

    if (this.palabraSecreta.includes(letra)) {
      this.palabraSecreta.split('').forEach((char, idx) => {
        if (char === letra) this.letrasMostradas[idx] = letra;
      });

      if (!this.letrasMostradas.includes('_')) {
        this.juegoTerminado = true;
        this.mensajeFinal = '¡Ganaste!';
      }
    } else {
      console.log("entro mal");
      this.vidas--;
      this.actualizarImagen();
      if (this.vidas < 1) {
        this.juegoTerminado = true;
        this.mensajeFinal = `¡Perdiste! La palabra era: ${this.palabraSecreta}`;
      }
    }
    console.log(this.vidas);
    console.log(this.juegoTerminado);
  }

  actualizarImagen() {
    this.imagenActual = `assets/ahorcado${7 - this.vidas}.png`; // asegúrate de tener ahorcado0.png hasta ahorcado7.png
  }
}
