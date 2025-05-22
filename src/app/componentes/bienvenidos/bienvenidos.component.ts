import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat/chat.component';
import { createClient } from '@supabase/supabase-js';
import { RouterLink, RouterOutlet } from '@angular/router';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");

@Component({
  selector: 'app-bienvenidos',
  standalone: true,
  imports: [CommonModule, ChatComponent, RouterOutlet, RouterLink],
  templateUrl: './bienvenidos.component.html',
  styleUrl: './bienvenidos.component.scss'
})
export class BienvenidosComponent implements OnInit {

  user: any = null;

ngOnInit() {
  supabase.auth.getUser().then(({ data, error }) => {
    this.user = data?.user;
  });

   supabase.auth.onAuthStateChange((_event, session) => {
    this.user = session?.user ?? null;
  });
}
}
