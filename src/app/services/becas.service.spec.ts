import { TestBed } from '@angular/core/testing';

import { BecasService } from './becas.service';

describe('BecasService', () => {
  let service: BecasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
