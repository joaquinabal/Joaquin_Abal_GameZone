// src/app/services/chat/chat.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private supabase: SupabaseClient;
  private _messages$ = new BehaviorSubject<any[]>([]);
  public messages$ = this._messages$.asObservable();

  constructor() {
    this.supabase = createClient(
      'https://heeyngkurdgdlcfryorg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8'
    );

    this.loadMessages();
    this.listenForMessages();
  }

  async loadMessages() {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      this._messages$.next(data);
    }
  }

  async sendMessage(content: string) {
  const user = await this.supabase.auth.getUser();
  const username = user.data?.user?.email || 'Anónimo';

  const { error } = await this.supabase
    .from('messages')
    .insert([{ content, username }]);

  if (error) {
    console.error('Error al enviar mensaje:', error.message);
  }
}


  listenForMessages() {
    this.supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new;
          this._messages$.next([...this._messages$.value, newMsg]);
        }
      )
      .subscribe();
  }
}
