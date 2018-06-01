import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { AuthState } from './model'
import { ValidationService } from './validation.service'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};
  message: Observable<string>

  constructor(
    private validationSvc: ValidationService,
    private http: HttpClient,
    private store: Store<AuthState>
  ) {
    http.get('resource').subscribe(data => this.greeting = data);
    this.message = store.select('message')
  }

  authenticated() { return this.validationSvc.authenticated; }

}
