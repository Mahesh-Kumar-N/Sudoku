import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sudoku-validator',
  templateUrl: './sudoku-validator.component.html',
  styleUrls: ['./sudoku-validator.component.css']
})
export class SudokuValidatorComponent implements OnInit {

  /**
   * Holds the message and a key to determine it is error or not. 
   */
  validationResult: {msg: string, error: boolean} = {
    msg: '',
    error: false
  };

  /**
   * Holds the sudoku grid value.
   */
  sudokuPuzzle: number[][] = [];

  /**
   * Hold the original sudoku grid value.
   */
  orginalSudoku: number[][] = [];

  constructor() {}

  /**
   * The ngOnInit function initializes a Sudoku puzzle by creating a 9x9 grid and filling it with either
   * empty cells, valid values, or invalid values.
   */
  ngOnInit(): void {
    //  Initialize the Sudoku puzzle with empty cells
    for (let i = 0; i < 9; i++) {
      this.sudokuPuzzle[i] = [];
      for (let j = 0; j < 9; j++) {
        this.sudokuPuzzle[i][j] = 0;
      }
    }

    // Initialize with valid value to check code validation is correct
    // this.sudokuPuzzle = this.getValidSudoku(); // uncomment to check valid value.

    // Initialize with InValid value to check code validation is correct
    // this.sudokuPuzzle = this.getInValidSudoKu(); // uncomment to check InValid value.

    this.orginalSudoku = JSON.parse(JSON.stringify(this.sudokuPuzzle));
  }

  /**
   * The function `validateSudokuPuzzle` checks if a given Sudoku puzzle is valid by ensuring that each
   * row, column, and 3x3 subgrid contains the numbers 1 to 9 without repetition.
   * @returns The function does not return a value. Instead, it sets the `validationResult` property of
   * the object to indicate whether the Sudoku puzzle is valid or not.
   */
  validateSudokuPuzzle(): void {
    // Check if each row contains the numbers 1 to 9 without repetition
    for (let row = 0; row < 9; row++) {
      const rowNumbers = new Set<number>();
      for (let col = 0; col < 9; col++) {
        const cellValue = this.sudokuPuzzle[row][col];
        if (cellValue < 1 || cellValue > 9) {
          this.validationResult = {
            msg: 'Invalid input: Numbers should be between 1 and 9',
            error: true
          };
          return;
        }
        if (rowNumbers.has(cellValue)) {
          this.validationResult = {
            msg: `Row ${row + 1} contains duplicate numbers`,
            error: true
          };
          return;
        }
        rowNumbers.add(cellValue);
      }
    }

    // Check if each column contains the numbers 1 to 9 without repetition
    for (let col = 0; col < 9; col++) {
      const colNumbers = new Set<number>();
      for (let row = 0; row < 9; row++) {
        const cellValue = this.sudokuPuzzle[row][col];
        if (colNumbers.has(cellValue)) {
          this.validationResult = {
            msg: `Column ${col + 1} contains duplicate numbers`,
            error: true
          };
          return;
        }
        colNumbers.add(cellValue);
      }
    }

    // Check if each 3x3 subgrid contains the numbers 1 to 9 without repetition
    for (let subgridRow = 0; subgridRow < 3; subgridRow++) {
      for (let subgridColumn = 0; subgridColumn < 3; subgridColumn++) {
        const subgridNumbers = new Set<number>();
        for (let row = subgridRow * 3; row < subgridRow * 3 + 3; row++) {
          for (let col = subgridColumn * 3; col < subgridColumn * 3 + 3; col++) {
            const cellValue = this.sudokuPuzzle[row][col];
            if (subgridNumbers.has(cellValue)) {
              this.validationResult = {
                msg: `Subgrid ${subgridRow + 1},${subgridColumn + 1} contains duplicate numbers`,
                error: true
              };
              return;
            }
            subgridNumbers.add(cellValue);
          }
        }
      }
    }

    // If all checks pass, the Sudoku puzzle is valid
    this.validationResult = {
      msg: 'Valid Sudoku puzzle',
      error: false
    };
  }

  /**
   * The function `onCellChange` updates the Sudoku puzzle with the entered number if it is between 1 and
   * 9, otherwise it resets the puzzle to its original state.
   * @param {number} enteredNum - The entered number for the Sudoku cell.
   * @param {number} i - The parameter "i" represents the row index of the cell in the Sudoku grid.
   * @param {number} j - The parameter "j" represents the column index of the cell in the Sudoku grid.
   */
  onCellChange(enteredNum: number, i: number, j: number) {
    this.validationResult = {
      msg: '',
      error: false
    };
    if (enteredNum >= 1 && enteredNum <= 9) {
      this.orginalSudoku[i][j] = enteredNum;
      this.sudokuPuzzle = JSON.parse(JSON.stringify(this.orginalSudoku));
    } else {
      this.sudokuPuzzle = JSON.parse(JSON.stringify(this.orginalSudoku));
    }
  }

  /**
   * The trackByIndex function returns the index value.
   * @param {number} index - The `index` parameter is a number that represents the position of an item in
   * a list or array. It is commonly used in Angular applications when using the `ngFor` directive to
   * iterate over a collection of items and display them in a template. The `trackByIndex` function is
   * used to
   * @returns The index value.
   */

  trackByIndex(index: number): number {
    return index;
  }

  /**
   * The function returns a valid Sudoku grid.
   * @returns a valid Sudoku grid represented as a 2D array of numbers.
   */
  getValidSudoku(): number[][] {
    return [
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
  }

  /**
   * The function returns an invalid Sudoku grid.
   * @returns a 2D array representing an invalid Sudoku puzzle.
   */
  getInValidSudoKu(): number[][] {
    return [
      [8, 2, 4, 7, 5, 9, 3, 1, 6],
      [6, 1, 9, 8, 3, 2, 4, 7, 5],
      [7, 5, 3, 6, 1, 4, 9, 2, 8],
      [9, 7, 2, 4, 6, 8, 5, 3, 1],
      [5, 4, 6, 9, 2, 1, 7, 8, 3],
      [1, 3, 8, 5, 7, 6, 2, 4, 9],
      [4, 6, 5, 1, 8, 3, 7, 9, 2],
      [2, 8, 1, 3, 9, 7, 6, 5, 4],
      [3, 9, 7, 2, 4, 5, 8, 1, 6]
    ];
  }
}
