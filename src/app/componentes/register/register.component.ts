import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient, User } from '@supabase/supabase-js'
import { ToastrService } from 'ngx-toastr';



const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
username: string;
password: string;

constructor(private router: Router, private toastr: ToastrService) {
  this.username = '';
  this.password = '';
}

/*
register() {
  supabase.auth.signUp({
    email: this.username,
    password: this.password,
  }).then(({ data, error }) => {
    if (error) {
  this.toastr.error(error.message, 'Error al registrarse');
} else {
  this.toastr.success('Registro exitoso. Verifica tu correo.', 'Éxito');
      this.login();
          
}
  }
  );
}
*/
async register() {
  await supabase.auth.signUp({
    email: this.username,
    password: this.password,
  }).then(({ data, error }) => {
    if (error) {
      if (error.message.includes('User already registered')) {
        this.toastr.error('El correo ya está registrado y confirmado.', 'Error');
      } else {
        this.toastr.error(error.message, 'Error al registrarse');
      }
    } else {
      this.toastr.success('Registro exitoso. Verifica tu correo.', 'Éxito');
    this.login();
    }
  });
}


login() {
    supabase.auth.signInWithPassword({
      email: this.username,
      password: this.password,
    }).then(async ({ data, error }) => {
      if (error) {
        console.error('Error:', error.message);
      } else if (data?.user){
        await supabase.from('login_logs').insert([
        {
          user_id: data.user.id,
          email: data.user.email
        }
        ])
        this.router.navigate(['/home']);
        
      } 
    });
  }
/*
saveUserData(user: User) {

  this.saveFile().then((data) => {
    if (data) { 

  supabase.from('usuarios').insert([
  ]).then(({ data, error }) => {
    if (error) {
      console.error('Error:', error.message);
    } else {
      this.router.navigate(['/home']);
    }
  });
}
});
*/
}
/*
async saveFile() {
const { data, error } = await supabase
  .storage
  .from('images')
  .upload(`users/${this.avatarFile?.name}`, this.avatarFile!, {
    cacheControl: '3600',
    upsert: false
  });

  return data;
}

onFileSelected(event: any) {
  this.avatarFile = event.target.files[0];
}
*/


