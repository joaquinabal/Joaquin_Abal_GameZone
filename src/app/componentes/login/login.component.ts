import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { Router,RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private router: Router,  private toastr: ToastrService ) {}

  login() {
    supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    }).then(async ({ data, error }) => {
      if (error) {

     
        this.toastr.error(error.message, 'Error  al loguearse');
      
    }  if (data?.user){
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

  autocompletarEmail() {
  this.email = 'joabal97@gmail.com';  
}

autocompletarPassword() {
  this.password = 'Morogro1';  
}

}
