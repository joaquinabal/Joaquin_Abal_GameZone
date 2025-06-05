import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiezMilService {
  readonly maxScore = 1000;
  readonly diceCount = 5;
  turnCount = 0;
  totalScore = 0;
  currentTurnScore = 0;
  remainingDice: number[] = [];
  lastRoll: number[] = [];

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.turnCount = 0;
    this.totalScore = 0;
    this.currentTurnScore = 0;
    this.remainingDice = Array(this.diceCount).fill(0);
    this.lastRoll = [];
  }

  rollDice(): number[] {
    const diceToRoll = this.remainingDice.length || this.diceCount;
    this.lastRoll = Array.from({ length: diceToRoll }, () =>
      Math.floor(Math.random() * 6) + 1
    );
    return this.lastRoll;
  }

  evaluateRoll(roll: number[]): { scoredDice: number[]; score: number } {
    const counts = Array(7).fill(0);
    roll.forEach((die) => counts[die]++);

    let score = 0;
    const scoredDice: number[] = [];

    for (let i = 1; i <= 6; i++) {
      if (counts[i] >= 3) {
        score += i === 1 ? 1000 : i * 100;
        scoredDice.push(...Array(3).fill(i));
        counts[i] -= 3;
      }
    }

    score += counts[1] * 100;
    scoredDice.push(...Array(counts[1]).fill(1));

    score += counts[5] * 50;
    scoredDice.push(...Array(counts[5]).fill(5));

    return { scoredDice, score };
  }

  startTurn() {
    this.turnCount++;
    this.currentTurnScore = 0;
    this.remainingDice = Array(this.diceCount).fill(0);
  }

  continueTurn(): boolean {
    if (this.remainingDice.length === 0) {
      this.remainingDice = Array(this.diceCount).fill(0); // recuperar todos los dados
    }

    const roll = this.rollDice();
    const { scoredDice, score } = this.evaluateRoll(roll);

    if (score === 0) {
      this.currentTurnScore = 0;
      return false; // turno perdido
    }

    this.currentTurnScore += score;
    this.remainingDice = roll.filter((die) => !scoredDice.includes(die) || !scoredDice.splice(scoredDice.indexOf(die), 1).length);

    return true; // turno válido
  }

  plantarse(): boolean {
    if (this.totalScore + this.currentTurnScore > this.maxScore) {
      this.currentTurnScore = 0;
      return false; // no se puede pasar de 10.000
    }

    this.totalScore += this.currentTurnScore;
    this.currentTurnScore = 0;
    this.remainingDice = [];

    return true;
  }

  isGameOver(): boolean {
    return this.totalScore === this.maxScore;
  }

  getFinalScore(): number {
    return Math.floor(this.totalScore / this.turnCount);
  }
}
