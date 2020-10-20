import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TListComponent } from './t-list.component';

describe('TListComponent', () => {
  let component: TListComponent;
  let fixture: ComponentFixture<TListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
