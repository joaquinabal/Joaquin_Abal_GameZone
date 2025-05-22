// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  public user: User | null = null;

  constructor() {
    this.supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "your_supabase_key");
    this.getUser();
  }

  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    this.user = user;
  }

  get client() {
    return this.supabase;
  }

  getUserId() {
    return this.user?.id;
  }

  getUsername() {
    return this.user?.email ?? 'Anon';
  }
}
