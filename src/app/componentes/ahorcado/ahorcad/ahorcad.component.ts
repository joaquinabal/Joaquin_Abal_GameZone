import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");

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
        this.mensajeFinal = `¡Ganaste! Puntaje final: ${this.vidas*10}`;
        this.guardarPuntaje('ahorcado', this.vidas*10);
      }
    } else {
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
