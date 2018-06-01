import { ValidationService } from './validation.service';
import 'rxjs/add/operator/finally'

import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private validationSvc: ValidationService, private http: HttpClient, private router: Router) {
    }
    logout() {
      this.http.post('logout', {}).finally(() => {
          this.validationSvc.authenticated = false;
          this.router.navigateByUrl('/login');
      }).subscribe();
    }

}
