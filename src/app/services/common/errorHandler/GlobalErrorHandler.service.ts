import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private snackBar: MatSnackBar) {}
    handleError(error: any) {

      if (error instanceof HttpErrorResponse) {
          console.error('Backend returned status code: ', error.status);
          console.error('Response body:', error.message);

      } else {
          console.error('An error occurred:', error.message);
      }
    }
}
