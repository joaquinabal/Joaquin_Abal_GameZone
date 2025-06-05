import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string;
  password: string;
  supabase: any;

  constructor(private router: Router, private toastr: ToastrService, supabaseService: SupabaseService) {
    this.username = '';
    this.password = '';
    this.supabase = supabaseService.getClient();
  }



  async register() {
    const { data, error } = await this.supabase.auth.signUp({
      email: this.username,
      password: this.password,
    });
    if (error) {
      console.log(error)
      if (error.message.includes('User already registered')) {
        this.toastr.error('El correo ya está registrado y confirmado.'  );
      } else if (error.message.includes("Signup requires a valid password")) {
        this.toastr.error('Ingresa una contraseña válida.');
      } else if (error.message.includes("email")) {
        this.toastr.error('Ingresa un correo válido .');
      }
    } else {
      this.toastr.success('Registro exitoso.');
      await this.login();
    }
  };



  async login() {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: this.username,
      password: this.password,
    });
    if (error) {
      console.log(error);
      console.error('Error:', error.message);
    } else if (data?.user) {
      await this.supabase.from('login_logs').insert([
        {
          user_id: data.user.id,
          email: data.user.email
        }
      ])
      this.router.navigate(['/home']);

    }
  };
}
