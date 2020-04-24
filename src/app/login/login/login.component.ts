import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { Router } from '@angular/router';
import { CodeLoginService } from 'src/app/services/code-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: LoginService, useClass: CodeLoginService}]
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      window.alert('You are already logged in');
      this.router.navigate(['/']);
    } else {
      if (!this.loginService.isUserVerified()) {
        this.loginService.verifyUser();
      }
      this.loginService.aquireAccessToken();
    }
  }
}
