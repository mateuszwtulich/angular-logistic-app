import { TestBed } from '@angular/core/testing';

import { LorryService } from './lorry.service';

describe('LorryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LorryService = TestBed.get(LorryService);
    expect(service).toBeTruthy();
  });
});
