// chat.component.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Component({
  standalone: true,
  selector: 'app-chat',
    imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  private supabase: SupabaseClient;
  messages: any[] = [];
  newMessage: string = '';
  currentUser: any;

  constructor() {
 this.supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");
  }

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  async ngOnInit() {
    const { data: { user } } = await this.supabase.auth.getUser();
    this.currentUser = user;

    await this.loadMessages();
    this.listenToMessages();
  }

  async loadMessages() {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error) {
      this.messages = data;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

listenToMessages() {
  this.supabase
    .channel('public:messages')
    .on(
      'postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'messages' }, 
      (payload) => {
        this.messages = [...this.messages, payload.new];
        setTimeout(() => this.scrollToBottom(), 100);
      }
    )
    .subscribe();
}

  async sendMessage() {
  if (!this.newMessage.trim()) return;

  const { data: { user }, error: userError } = await this.supabase.auth.getUser();

  if (!user) {
    console.error('Usuario no autenticado', userError);
    return;
  }

  const { id, email } = user;

  const { error } = await this.supabase.from('messages').insert([
    {
      content: this.newMessage,
      sender_id: id,
      sender_email: email,
      created_at: new Date().toISOString()
    }
  ]);

  this.scrollToBottom(); 
  if (error) {
    console.error('Error al enviar mensaje:', error);
  } else {
    this.newMessage = '';
  }
}

scrollToBottom() {
  try {
    setTimeout(() => {
      if (this.chatContainer?.nativeElement) {
        console.log("funca");
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  } catch (err) {
    console.log("no funca");
    console.error('Error en scrollToBottom:', err);
  }
}



}
