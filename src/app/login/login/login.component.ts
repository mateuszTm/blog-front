import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      window.alert('You are logged in');
      this.router.navigate(['/']);
    } else {
      if (!this.authService.isUserVerified()) {
        this.authService.verifyUser();
      }
      this.authService.aquireAccessToken();
    }
  }
}
