import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiezmilComponent } from './diezmil.component';

describe('DiezmilComponent', () => {
  let component: DiezmilComponent;
  let fixture: ComponentFixture<DiezmilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiezmilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiezmilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
