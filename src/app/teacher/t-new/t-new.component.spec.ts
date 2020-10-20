import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TNewComponent } from './t-new.component';

describe('TNewComponent', () => {
  let component: TNewComponent;
  let fixture: ComponentFixture<TNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
