import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HandleError {
    constructor() { }
    handleError(error: HttpErrorResponse) {
        let errMsg = '';
        if (error.error instanceof ErrorEvent) {
            errMsg = error.error.message;
            console.error('An error occured:', error.error.message);
        } else {
            errMsg = `${error.status} ${error.message}`;
            console.error(`Backend returned code ${error.status},` +
                ` ${error.message}`);
        }
        // return Rxjs ErrorObservable
        return throwError(errMsg);
    }

}
