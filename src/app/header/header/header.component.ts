import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { CodeLoginService } from 'src/app/services/code-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: LoginService, useClass: CodeLoginService}]
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
    window.location.reload();
    console.log('you have been logged out');
  }
}
