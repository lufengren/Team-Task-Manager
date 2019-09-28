import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HandleError {
    constructor() { }
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occured:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status},` +
                ` ${error.message}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
