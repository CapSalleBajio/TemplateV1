import { TestBed } from '@angular/core/testing';

import { HasSessionGuard } from './has-session.guard';

describe('HasSessionGuard', () => {
  let guard: HasSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
