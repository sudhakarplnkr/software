import { Injectable } from '@angular/core';
import { Predicate } from '../shared/interfaces'
import alertify from 'alertify.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
    private _notifier: any = alertify;

    constructor() { }

    /*
    Opens a confirmation dialog using the alertify.js lib
    */
    openConfirmationDialog(message: string, okCallback: () => any) {
        this._notifier.confirm(message, function (e) {
            if (e) {
                okCallback();
            } else {
            }
        });
    }

    /*
    Prints a success message using the alertify.js lib
    */
    printSuccessMessage(message: string) {
        this._notifier.success(message);
    }

    /*
    Prints an error message using the alertify.js lib
    */
    printErrorMessage(message: string) {
        this._notifier.error(message);
    }

    handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';
    
        if (!serverError.type) {
          console.log(serverError);
          for (var key in serverError) {
            if (serverError[key])
              modelStateErrors += serverError[key] + '\n';
          }
        }
    
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
      }
}
