import 'rxjs/add/operator/auditTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'

import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AppService } from './app.service'
import { validationMessages } from './constants'
import { Credentials } from './model'
import { Subject } from 'rxjs/Subject';

@Component({
  styleUrls: ['./app.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  credentials: Credentials = { username: '', password: '' };
  passwordMessages: string[] = []
  passwordCrtl: FormControl

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.passwordCrtl = new FormControl("", [Validators.required]);

    this.passwordCrtl.valueChanges
      .takeUntil(this.componentDestroyed$)
      .auditTime(175)
      .subscribe(() => {
        if (this.passwordMessages.length) this.setValidationErrors(this.app.validate(this.credentials))
    })
  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  login() {
    let validationErrors = this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });

    this.setValidationErrors(validationErrors)

    return false;
  }

  setValidationErrors(validationErrors: string[]) {
    this.passwordMessages = []
    if (validationErrors.length) {
      this.passwordCrtl.setErrors({ validationErrors: true })
      validationErrors.forEach(err => this.passwordMessages.push(validationMessages[err]))
    } else {
      this.passwordCrtl.setErrors({ validationErrors: null })
    }
  }

}
