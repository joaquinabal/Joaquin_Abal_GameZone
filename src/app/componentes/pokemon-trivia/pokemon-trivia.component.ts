import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Subscription, interval } from 'rxjs';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-pokemon-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-trivia.component.html'
})
export class PokemonTriviaComponent implements OnInit, OnDestroy {
  pokemons: any[] = [];
  questions: any[] = [];
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 15;
  timerSub?: Subscription;
  showAnswer = false;
  gameOver = false;
  selectedAnswer: string | null = null;
  wasCorrect: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonData().subscribe((data: any[]) => {
      this.pokemons = data;
      console.log(this.pokemons); 
      this.generateQuestions();
      this.startTimer();
    });
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

  generateQuestions() {
    const selected = shuffle(this.pokemons).slice(0, 5);
    this.questions = selected.map(p => {
      const correct = p.name;
      const others = shuffle(this.pokemons.filter(x => x.name !== correct)).slice(0, 3);
      const options = shuffle([correct, ...others.map(x => x.name)]);
      return {
        name: p.name,
        image: p.sprites.front_default,
        options
      };
    });
  }

  startTimer() {
    this.timeLeft = 15;
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) this.submitAnswer(null);
    });
  }

submitAnswer(option: string | null) {
  if (this.showAnswer) return;

  this.timerSub?.unsubscribe();
  this.selectedAnswer = option;
  const correct = this.questions[this.currentQuestionIndex].name;
  this.wasCorrect = option === correct;
  if (this.wasCorrect) this.score++;
  this.showAnswer = true;

  setTimeout(() => this.nextQuestion(), 2500);
}

nextQuestion() {
  this.showAnswer = false;
  this.selectedAnswer = null;
  this.wasCorrect = false;
  this.currentQuestionIndex++;

  if (this.currentQuestionIndex >= this.questions.length) {
    this.gameOver = true;
  } else {
    this.startTimer();
  }
}


  restartGame() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.gameOver = false;
    this.generateQuestions();
    this.startTimer();
  }
}