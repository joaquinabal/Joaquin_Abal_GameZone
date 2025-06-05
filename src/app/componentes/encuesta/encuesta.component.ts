
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { minCheckboxSeleccionados } from '../../validadores/checkbox';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit {

form!: FormGroup;
generosLista = ['RPG', 'Deportes', 'FPS', 'Acción', 'Aventuras', 'Party Game', 'Casual', 'RTS'];


constructor(private supabase: SupabaseService,  private router: Router,
    private toastr: ToastrService) {}

ngOnInit(): void {
  const generosGroup: { [key: string]: FormControl } = {};
    this.generosLista.forEach(genero => {
      generosGroup[genero] = new FormControl(false);
    });
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.required,Validators.minLength(1), Validators.pattern('^[a-zA-Z]+$')]),
      apellido: new FormControl("", [Validators.required,Validators.minLength(1), Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl("", [Validators.required, Validators.min(18), Validators.max(99)]),
      telefono: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]),
      juegoFavorito: new FormControl('', Validators.required),
       generos: new FormGroup(generosGroup, [minCheckboxSeleccionados(2)]),
       comentario: new FormControl('', [Validators.required, Validators.minLength(20)]),


  
    });
  }

async enviarForm() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.toastr.error('Corrige los campos para envíar la encuesta.', 'Formulario inválido', {
        positionClass: 'toast-top-right'
      });
    return;
  }

  const generosSeleccionados = Object.entries(this.form.value.generos)
  .filter(([_, value]) => value)
  .map(([key]) => key);

  const datos = {
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    edad: this.form.value.edad,
    telefono: this.form.value.telefono,
    juego_favorito: this.form.value.juegoFavorito,
    generos: generosSeleccionados,
    comentario: this.form.value.comentario,
  };

  try {
    await this.supabase.guardarEncuesta(datos);
    this.toastr.success('¡Encuesta Envíada!', '', { positionClass: 'toast-top-right' });
    this.form.reset();
    this.router.navigate(['/home']);
  } catch (error) {
    console.error('Error al enviar encuesta:');
  }
}


  get usuario() {
    return this.form.get('usuario');
  }
  
  get nombre() {
    return this.form.get('nombre');
  }

    get apellido() {
    return this.form.get('apellido');
  }

  get edad() {
    return this.form.get('edad');
  }

    get telefono() {
    return this.form.get('telefono');
  }
 get juegoFavorito() {
  return this.form.get('juegoFavorito');
}

  get generos() {
    return this.form.get('generos') as FormGroup;
  }

  get comentario() {
  return this.form.get('comentario');
}


  
}
