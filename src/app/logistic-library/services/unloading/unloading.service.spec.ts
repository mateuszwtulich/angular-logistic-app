import { TestBed } from '@angular/core/testing';

import { UnloadingService } from './unloading.service';

describe('UnloadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnloadingService = TestBed.get(UnloadingService);
    expect(service).toBeTruthy();
  });
});
