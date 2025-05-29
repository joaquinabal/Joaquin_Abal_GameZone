import { TestBed } from '@angular/core/testing';

import { DiezmilService } from './diezmil.service';

describe('DiezmilService', () => {
  let service: DiezmilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiezmilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
