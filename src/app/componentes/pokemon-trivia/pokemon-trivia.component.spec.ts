import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTriviaComponent } from './pokemon-trivia.component';

describe('PokemonTriviaComponent', () => {
  let component: PokemonTriviaComponent;
  let fixture: ComponentFixture<PokemonTriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTriviaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
