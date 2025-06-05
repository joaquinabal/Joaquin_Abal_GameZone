import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  supabase: any;


  constructor(private router: Router, private toastr: ToastrService, supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async login() {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });
    if (error) {
      if(error.message.includes("Invalid login credentials")){
              this.toastr.error('Credenciales inválidas.'); 
    }else{
      this.toastr.error('Error  al loguearse');

    }}
     this.toastr.success('Logueo exitoso.');
    if (data?.user) {
      await this.supabase.from('login_logs').insert([
        {
          user_id: data.user.id,
          email: data.user.email
        }
      ])
      this.router.navigate(['/home']);

    }
    ;
  }

  autocompletarEmail() {
    this.email = 'joabal97@gmail.com';
  }

  autocompletarPassword() {
    this.password = 'Morogro1';
  }

}
