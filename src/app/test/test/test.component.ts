import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { CodeLoginService } from 'src/app/services/code-login.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [{provide: LoginService, useClass: CodeLoginService}]
})
export class TestComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  getCode() {
    console.log('kliknięto pobierz kod');
    this.loginService.verifyUser();
  }

  getToken() {
    console.log('kliknięto pobierz token');
    this.loginService.aquireAccessToken();
  }
}
