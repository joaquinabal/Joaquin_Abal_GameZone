import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Subscription, interval } from 'rxjs';
import { shuffle } from 'lodash';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient("https://heeyngkurdgdlcfryorg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXluZ2t1cmRnZGxjZnJ5b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDM2NjksImV4cCI6MjA2MTcxOTY2OX0.8_hEGRfdaNsiQmQNEIbDHD8lIXoafIbTpfGgd-DOPh8");


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
      this.guardarPuntaje('preguntados', this.score);
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