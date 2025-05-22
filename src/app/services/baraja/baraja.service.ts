// src/app/services/baraja.service.ts
import { Injectable } from '@angular/core';

export interface Card {
  value: number;     // 1 a 12
  suit: string;      // 'oros', 'copas', 'espadas', 'bastos'
}

@Injectable({
  providedIn: 'root'
})
export class BarajaService {

  private suits: string[] = ['oros', 'copas', 'espadas', 'bastos'];

  constructor() { }

  // Genera la baraja completa de 48 cartas
  generateDeck(): Card[] {
    const deck: Card[] = [];
    for (let value = 1; value <= 12; value++) {
      for (const suit of this.suits) {
        deck.push({ value, suit });
      }
    }
    return deck;
  }

  // Mezcla la baraja con un shuffle básico
  shuffle(deck: Card[]): Card[] {
    // Algoritmo Fisher-Yates para mezclar correctamente
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  }

  // Genera y mezcla la baraja lista para usar
  getShuffledDeck(): Card[] {
    const deck = this.generateDeck();
    return this.shuffle(deck);
  }
}
