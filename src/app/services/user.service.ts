import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ResourcesPage } from '../dto/resources-page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8082/resourceserver/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    });
  }

  getCurrentUserPosts(httpParams?: HttpParams): Observable<ResourcesPage> {
    if (!httpParams) {
      httpParams = new HttpParams().set('page', '0');
    }
    return this.http.get<ResourcesPage>(
      this.url + '/post',
      {
        params: httpParams.set('sort', 'date,desc'),
        headers: this.getHeaders()
      }
    );
  }
}
