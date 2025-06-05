import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase/supabase.service'; // ajustá el path según tu estructura

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  puntuaciones: any[] = [];
  juegoActual = 'diezmil';

  juegos = ['diezmil', 'preguntados', 'ahorcado', 'mayoromenor'];


  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.cargarPuntajes();
  }

  async cargarPuntajes() {
    this.puntuaciones = await this.supabaseService.obtenerPuntuaciones(this.juegoActual);
  }

  cambiarJuego(juego: string) {
    this.juegoActual = juego;
    this.cargarPuntajes();
  }

    capitalizar(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }
}
