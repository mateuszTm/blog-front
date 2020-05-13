import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
