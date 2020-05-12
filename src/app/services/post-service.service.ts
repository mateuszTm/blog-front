import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PostService{
    private url = 'http://localhost:8082/resourceserver/post';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    public getPosts(options?: object): Observable<any> {
        return this.http.get<any>(this.url, options);
    }

    public getPage(pageNumber: number): Observable<any> {
        return this.getPosts({params: {page: pageNumber.toString()}});
    }

    public addPost(postTitle: string, postContent: string): Observable<any> {
          return this.http.post(
            this.url,
            {
              title: postTitle,
              content: postContent
            }, {
              headers: {
                'Content-type': 'application/json; charset=utf-8',
                Authorization: 'Bearer ' + this.authService.getAccessToken()
              }
            });
    }
}
