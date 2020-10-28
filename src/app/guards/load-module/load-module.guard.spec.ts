import { TestBed } from '@angular/core/testing';

import { LoadModuleGuard } from './load-module.guard';

describe('LoadModuleGuard', () => {
  let guard: LoadModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
