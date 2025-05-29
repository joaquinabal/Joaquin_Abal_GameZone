import { Component, OnInit } from '@angular/core';
import { DeckApiService } from '../../../services/deck-api/deck-api.service';
import { CommonModule } from '@angular/common';

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
        this.gameOver = true;
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
}
