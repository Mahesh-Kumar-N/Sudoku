import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {SudokuValidatorComponent} from './sudoku-validator.component';

describe('SudokuValidatorComponent', () => {
  let component: SudokuValidatorComponent;
  let fixture: ComponentFixture<SudokuValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuValidatorComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SudokuValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should check sudokuPuzzle and orginalSudoku to be initialized with 0', () => {
      component.ngOnInit();

      expect(component.sudokuPuzzle).toEqual(
        [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      );
      expect(component.orginalSudoku).toEqual(component.sudokuPuzzle);
    });
  });

  describe('validateSudokuPuzzle', () => {
    it('should validate a valid Sudoku puzzle', () => {
      component.sudokuPuzzle = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ];

      component.validateSudokuPuzzle();
      expect(component.validationResult.msg).toBe('Valid Sudoku puzzle');
      expect(component.validationResult.error).toBe(false);
    });

    it('should detect invalid input in a Sudoku puzzle', () => {
      component.sudokuPuzzle = [
        [5, 3, 4, 6, 7, 8, 9, 1, 0],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [9, 8, 1, 3, 4, 2, 5, 7, 6],
        [2, 1, 8, 7, 5, 3, 6, 9, 4],
        [3, 4, 9, 8, 2, 6, 1, 5, 7],
        [7, 5, 6, 4, 1, 9, 2, 8, 3],
        [8, 9, 3, 2, 6, 1, 4, 7, 5],
        [1, 6, 5, 9, 8, 7, 2, 3, 4],
        [4, 2, 7, 5, 3, 8, 6, 1, 9]];

      component.validateSudokuPuzzle();
      expect(component.validationResult.msg).toBe('Invalid input: Numbers should be between 1 and 9');
      expect(component.validationResult.error).toBe(true);
    });

    it('should detect duplicate numbers in a row of a Sudoku puzzle', () => {
      component.sudokuPuzzle = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [9, 8, 1, 3, 4, 2, 5, 7, 6],
        [2, 1, 8, 7, 5, 3, 6, 9, 4],
        [3, 4, 9, 8, 2, 6, 1, 5, 7],
        [7, 5, 6, 4, 1, 9, 2, 8, 3],
        [8, 9, 3, 2, 6, 1, 4, 7, 5],
        [1, 2, 5, 9, 8, 7, 2, 3, 4],
        [4, 6, 7, 5, 3, 8, 2, 1, 9]];

      component.validateSudokuPuzzle();
      expect(component.validationResult.msg).toBe('Row 8 contains duplicate numbers');
      expect(component.validationResult.error).toBe(true);
    });

    it('should detect duplicate numbers in a column of a Sudoku puzzle', () => {
      component.sudokuPuzzle = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [9, 8, 1, 3, 4, 2, 5, 7, 6],
        [2, 1, 8, 7, 5, 3, 6, 9, 4],
        [3, 4, 9, 8, 2, 6, 1, 5, 7],
        [7, 5, 6, 4, 1, 9, 2, 8, 3],
        [8, 9, 3, 2, 6, 1, 4, 7, 5],
        [1, 6, 5, 9, 8, 7, 2, 3, 4],
        [4, 2, 7, 5, 3, 8, 6, 9, 1]];

      component.validateSudokuPuzzle();
      expect(component.validationResult.msg).toBe('Column 6 contains duplicate numbers');
      expect(component.validationResult.error).toBe(true);
    });
  });

  describe('onCellChange', () => {
    let initialSudoku: number[][] = []
    beforeEach(() => {
      initialSudoku = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [9, 8, 1, 3, 4, 2, 5, 7, 6],
        [2, 1, 8, 7, 5, 3, 6, 9, 4],
        [3, 4, 9, 8, 2, 6, 1, 5, 7],
        [7, 5, 6, 4, 1, 9, 2, 8, 3],
        [8, 9, 3, 2, 6, 1, 4, 7, 5],
        [1, 6, 5, 9, 8, 7, 2, 3, 4],
        [4, 2, 7, 5, 3, 8, 6, 1, 9]];
      component.sudokuPuzzle = JSON.parse(JSON.stringify(initialSudoku));
      component.orginalSudoku = JSON.parse(JSON.stringify(initialSudoku));
    });

    it('should update the Sudoku puzzle with valid input', () => {
      component.onCellChange(5, 2, 3);
      expect(component.sudokuPuzzle[2][3]).toBe(5);
    });

    it('should not update the Sudoku puzzle with invalid input', () => {
      component.onCellChange(10, 4, 5);
      expect(component.sudokuPuzzle[4][5]).toBe(initialSudoku[4][5]);
    });

    it('should clear the validation message and error flag when valid input is entered', () => {
      component.validationResult.msg = 'Invalid input';
      component.validationResult.error = true;
      component.onCellChange(5, 2, 3);
      expect(component.validationResult.msg).toBe('');
      expect(component.validationResult.error).toBe(false);
    });
  });

  describe('trackByIndex', () => {
    it('should return the index as the unique identifier', () => {
      expect(component.trackByIndex(0)).toBe(0);
      expect(component.trackByIndex(1)).toBe(1);
      expect(component.trackByIndex(8)).toBe(8);
    });
  });

  describe('getValidSudoku', () => {
    it('should check ValidSudoku grid value is returned', () => {
      const validSudoku = component.getValidSudoku();

      expect(validSudoku).toEqual([
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ]);
    });
  })
});
