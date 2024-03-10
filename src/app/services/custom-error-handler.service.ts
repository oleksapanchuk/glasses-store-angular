import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: unknown) {
    this.snackBar.open(
      'Error',
      'Close',
      {
        duration: 2000
      }
    );
    console.warn(`Caught by Customer Error Handler `, error);
  }
}
