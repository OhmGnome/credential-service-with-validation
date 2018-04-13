import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Credentials } from './model'

@Injectable()
export class AppService {

    authenticated = false;

    constructor(private http: HttpClient) {
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
                } else {
                    this.authenticated = false;
                }
                return callback && callback();
            });
        }

        return validationErrors
    }

    validate(credentials: Credentials){
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