import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Post } from '../dto/post';
import { PostForm } from '../dto/post-form';
import { ResourcesPage } from '../dto/resources-page';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://localhost:8082/resourceserver/post';

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

  public getPostById(id: number | string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }

  public getPosts(httpParams?: HttpParams): Observable<ResourcesPage> {
    if (!httpParams) {
      httpParams = new HttpParams().set('page', '0');
    }
    return this.http.get<ResourcesPage>(this.url, { params: httpParams.set('sort', 'date,desc') });
  }

  public addPost(post: PostForm): Observable<Post> {
    return this.http.post<Post>(
      this.url,
      post,
      {
        headers: this.getHeaders()
      });
  }

  public editPost(id: number | string, post: PostForm): Observable<Post> {
    return this.http.put<Post>(
      this.url + '/' + id,
      post,
      {
        headers: this.getHeaders()
      }
    );
  }
}
