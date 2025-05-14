import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "your_supabase_key");

@Component({
  selector: 'app-bienvenidos',
  standalone: true,
  imports: [CommonModule],
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
