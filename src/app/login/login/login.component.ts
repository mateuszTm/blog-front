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
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.messageService.info('You are already logged in');
      this.router.navigate(['/']);
      console.log('is logged in');
    } else {
      if (!this.authService.isUserVerified()) {
        console.log('is not verified');
        this.authService.verifyUser();
      }
      console.log('aquire token');
      this.authService.aquireAccessToken();
    }
  }
}
