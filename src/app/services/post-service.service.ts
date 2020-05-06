import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService{
    private url = 'http://localhost:8082/resourceserver/post';

    constructor(private http: HttpClient){}

    public getPosts(options?: object): Observable<any> {
        return this.http.get<any>(this.url, options);
    }

    public getPage(pageNumber: number): Observable<any> {
        return this.getPosts({params: {page: pageNumber.toString()}});
    }
}
