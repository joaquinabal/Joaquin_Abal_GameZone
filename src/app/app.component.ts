import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "your_supabase_key");


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user: any;
  title = 'GAME ZONE';

  ngOnInit() {
  supabase.auth.getUser().then(({ data, error }) => {
    this.user = data?.user;

     supabase.auth.onAuthStateChange((_event, session) => {
    this.user = session?.user ?? null;
  });
  });
  }

logout() {
  supabase.auth.signOut().then(({ error }) => {
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      this.user = null;
    }

         supabase.auth.onAuthStateChange((_event, session) => {
    this.user = session?.user ?? null;
  });
  });
  
}

}

