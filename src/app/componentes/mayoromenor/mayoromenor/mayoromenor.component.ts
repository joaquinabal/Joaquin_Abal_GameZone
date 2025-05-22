import { Component, OnInit } from '@angular/core';
import { BarajaService, Card } from '../../../services/baraja/baraja.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mayor-menor',
  templateUrl: './mayoromenor.component.html',
})
export class MayorMenorComponent implements OnInit {
  deck: Card[] = [];
  currentCard!: Card | null ;
  nextCard!: Card | null ;
  score = 0;
  gameOver = false;

  constructor(private barajaService: BarajaService) {}

  ngOnInit(): void {
    // Opcional: iniciar el juego automáticamente
    // this.startGame();
  }

  startGame(): void {
    this.deck = this.barajaService.getShuffledDeck();
    this.score = 0;
    this.gameOver = false;
    this.currentCard = this.deck.pop() || null;
    this.nextCard = null;
  }

  guess(higher: boolean): void {
    if (this.gameOver || !this.deck.length || !this.currentCard) return;

    this.nextCard = this.deck.pop()!;

    if (this.nextCard.value === this.currentCard.value) {
      // Empate: tomar la siguiente carta sin sumar ni perder
      this.currentCard = this.nextCard;
      this.nextCard = null;
      return;
    }

    const isCorrect =
      (higher && this.nextCard.value > this.currentCard.value) ||
      (!higher && this.nextCard.value < this.currentCard.value);

    if (isCorrect) {
      this.score++;
      this.currentCard = this.nextCard;
      this.nextCard = null;
    } else {
      this.gameOver = true;
    }
  }
}
