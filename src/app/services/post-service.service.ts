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
export class PostService{
    private url = 'http://localhost:8082/resourceserver/post';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    public getPostById(id: number|string): Observable<Post> {
      return this.http.get<Post>(this.url + '/' + id);
    }

    public getPosts(options?: object): Observable<ResourcesPage> {
        return this.http.get<ResourcesPage>(this.url, options);
    }

    public getPage(pageNumber: number): Observable<ResourcesPage> {
        return this.getPosts({
          params: {
            page: pageNumber.toString(),
            sort: 'date,desc'
          }
        });
    }

    public addPost(post: PostForm): Observable<Post> {
          return this.http.post<Post>(
            this.url,
            post,
            {
              headers: {
                'Content-type': 'application/json; charset=utf-8',
                Authorization: 'Bearer ' + this.authService.getAccessToken()
              }
            });
    }

    public editPost(id: number|string, post: PostForm): Observable<Post> {
      return this.http.put<Post>(
        this.url + '/' + id,
        post,
        {
          headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + this.authService.getAccessToken()
          }
        }
      );
    }
}
