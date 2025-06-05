import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }


  async obtenerPuntuaciones(juego: string, limite: number = 10) {
    const { data, error } = await this.supabase
      .from('puntuacion')
      .select('*')
      .eq('juego', juego)
      .order('puntaje', { ascending: false })
      .limit(limite);

    if (error) {
      console.error('Error al obtener puntuaciones:', error.message);
      return [];
    }

    return data;
  }

  async insertarPuntuacion(usuario: string, juego: string, puntaje: number) {
    const { error } = await this.supabase
      .from('puntuacion')
      .insert([{ usuario, juego, puntaje }]);

    if (error) {
      console.error('Error al insertar puntuación:', error.message);
    }
  }

  getUsuarioActual() {
    return this.supabase.auth.getUser();
  }


async guardarPuntuacion(usuario: string, juego: string, puntaje: number) {
  const { error } = await this.supabase
    .from('puntuacion')
    .insert([{ usuario, juego, puntaje }]);

  if (error) {
    console.error('Error al guardar puntuación:', error.message);
  }
}

 async guardarEncuesta(data: any) {
    const supabase = this.getClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    const { error, data: result } = await supabase
      .from('encuesta')
      .insert({
        ...data,
        usuario: user.email,
      });
    if (error) throw error;
    return result;
  }
}



