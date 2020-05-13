import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

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
      MessageService.info('You are already logged in');
      this.router.navigate(['/']);
      console.log('is logged in');
    } else {
      if (!this.authService.isUserVerified()) {
        alert('is not verified');
        this.authService.verifyUser();
      }
      alert('aquire token');
      this.authService.aquireAccessToken();
    }
  }
}
