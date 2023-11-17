import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuValidatorComponent } from './sudoku-validator.component';

describe('SudokuValidatorComponent', () => {
  let component: SudokuValidatorComponent;
  let fixture: ComponentFixture<SudokuValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuValidatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
