import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { Router,RouterLink } from '@angular/router';


const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './quiensoy.component.html',
  styleUrl: './quiensoy.component.scss'
})
export class QuienSoyComponent {


  constructor(private router: Router) {}

 
}
