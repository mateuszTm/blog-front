import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private url = 'http://localhost:8082/resourceserver/post';

    constructor(private http: HttpClient){}

    public getPosts(): Observable<any> {
        return this.http.get<any>(this.url);
    }
}
