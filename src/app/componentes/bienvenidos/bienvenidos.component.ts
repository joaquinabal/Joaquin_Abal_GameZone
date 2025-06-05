import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService  } from '../../services/supabase/supabase.service';


@Component({
  selector: 'app-bienvenidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bienvenidos.component.html',
  styleUrl: './bienvenidos.component.scss'
})
export class BienvenidosComponent implements OnInit {

  user: any = null;

  constructor(private supabase: SupabaseService) {}

ngOnInit() {
  
  const supabase = this.supabase.getClient();

  supabase.auth.getUser().then(({ data, error }) => {
    this.user = data?.user;
  });

   supabase.auth.onAuthStateChange((_event, session) => {
    this.user = session?.user ?? null;
  });
}
}
