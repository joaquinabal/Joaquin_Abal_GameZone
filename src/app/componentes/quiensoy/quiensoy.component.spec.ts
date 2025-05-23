import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienSoyComponent } from './quiensoy.component';

describe('QuiensoyComponent', () => {
  let component: QuienSoyComponent;
  let fixture: ComponentFixture<QuienSoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuienSoyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuienSoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
