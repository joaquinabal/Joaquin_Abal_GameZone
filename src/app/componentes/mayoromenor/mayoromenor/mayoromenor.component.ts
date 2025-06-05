import { Component, OnInit } from '@angular/core';
import { DeckApiService } from '../../../services/deck-api/deck-api.service';
import { CommonModule } from '@angular/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");


@Component({
  selector: 'mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayoromenor.component.html'
})
export class MayorMenorComponent {
  deckId: string = '';
  currentCard: any = null;
  nextCard: any = null;
  score = 0;
  gameOver = false;
  mensajeFinal = "";


  
  constructor(private deckService: DeckApiService) {}

  ngOnInit(){
    this.startGame();
  }

  startGame() {
    this.deckService.crearMazo().subscribe(data => {
      this.deckId = data.deck_id;
      this.score = 0;
      this.gameOver = false;
      this.drawCard();
    });
  }

  drawCard() {
    this.deckService.sacarCarta(this.deckId).subscribe(data => {
      this.currentCard = data.cards[0];
    });
  }

  guess(higher: boolean) {
    this.deckService.sacarCarta(this.deckId).subscribe(data => {
      this.nextCard = data.cards[0];

      const currValue = this.getCardNumericValue(this.currentCard.value);
      const nextValue = this.getCardNumericValue(this.nextCard.value);

      if (currValue === nextValue) {
        this.currentCard = this.nextCard;
        this.nextCard = null;
        return;
      }

      const isCorrect = (higher && nextValue > currValue) || (!higher && nextValue < currValue);

      if (isCorrect) {
        this.score++;
        this.currentCard = this.nextCard;
        this.nextCard = null;
      } else {
        this.currentCard = this.nextCard;
        this.gameOver = true;
        this.mensajeFinal = `¡Perdiste! Puntaje final: ${this.score}`;
        this.guardarPuntaje('mayoromenor', this.score);
      }
    });
  }

  getCardNumericValue(value: string): number {
    switch (value) {
      case 'ACE': return 1;
      case 'JACK': return 11;
      case 'QUEEN': return 12;
      case 'KING': return 13;
      default: return parseInt(value, 10);
    }
  }

async guardarPuntaje(juego: string, puntaje: number) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error('Error al obtener el usuario autenticado:', error);
    return;
  }

  const usuario = data.user.email || data.user.id;
  console.log(usuario);
  const { error: insertError } = await supabase
    .from('puntuacion')
    .insert([{ usuario, juego, puntaje, fecha: new Date().toISOString() }]);

  if (insertError) {
    console.error('Error al guardar el puntaje:', insertError.message);
  } else {
    console.log('Puntaje guardado correctamente');
  }
}
}
