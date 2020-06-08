import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ResourcesPage } from '../dto/resources-page';
import { Observable } from 'rxjs';
import { Profile } from '../dto/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceCopy {

  private url = 'http://localhost:8082/resourceserver/profile';

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

  getCurrentUserProfile(): Observable<Profile> {
    return this.http.get<Profile>(
      this.url,
      {
        headers: this.getHeaders()
      }
    );
  }

  getProfiles(httpParams?: HttpParams): Observable<ResourcesPage> {
    if (!httpParams) {
      httpParams = new HttpParams().set('page', '0');
    }
    return this.http.get<ResourcesPage>(
      this.url + '/list',
      {
        params: httpParams.set('sort', 'id,desc'),
        headers: this.getHeaders()
      }
    );
  }

  getProfileById(id: number|string): Observable<Profile> {
    return this.http.get<Profile>(
      this.url + '/' + id,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateProfileById(id: number|string, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      this.url + '/' + id,
      profile,
      {
        headers: this.getHeaders()
      }
    );
  }

  public delete(id: number | string): Observable<any> {
    return this.http.delete(
      this.url + '/' + id,
      {
        headers: this.getHeaders()
      }
      );
  }
}