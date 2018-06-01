import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'

import { AuthState, Credentials } from './model'

export const validationMessages = {
    'variety': 'should contain at least one lowercase letter and number',
    'length': 'should be between 5 & 12 characters long',
    'duplicates': 'should not contain repeating characters'
}


@Injectable()
export class ValidationService {

    authenticated = false;

    constructor(
        private http: HttpClient,
        private store: Store<AuthState>
    ) {
    }

    authenticate(credentials: Credentials, callback) {
        let validationErrors = this.validate(credentials)

        if (!validationErrors.length) {
            const headers = new HttpHeaders(credentials ? {
                authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
            } : {});

            this.http.get('user', { headers: headers }).subscribe(response => {
                if (response['name']) {
                    this.authenticated = true;
                    this.store.dispatch({ type: 'authorized' })
                } else {
                    this.authenticated = false;
                    this.store.dispatch({ type: 'unauthorized' })
                }
                return callback && callback();
            });
        }

        return validationErrors
    }

    validate(credentials: Credentials) {
        let validationErrors: string[] = []

        //The string must contain at least 1 lowercase alphabetical character and at least 1 numeric character
        let hasVariety = new RegExp("^(?=.*[a-z])(?=.*[0-9])");

        //characters must not be repeated
        let hasDuplicates = (/([a-z0-9])\1/i).test(credentials.password)

        if (!hasVariety.test(credentials.password)) validationErrors.push('variety')
        if (credentials.password.length < 5 || credentials.password.length > 12) validationErrors.push('length')
        if (hasDuplicates) validationErrors.push('duplicates')

        return validationErrors
    }

}