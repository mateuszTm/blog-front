import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from './message/message.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractResourceService {

  static HEADER_AUTH = 'Authorization';
  static HEADER_CONTENT_TYPE_APP_JSON = 'Content-type';
  protected headersMap = {
    [AbstractResourceService.HEADER_CONTENT_TYPE_APP_JSON]: () => 'application/json; charset=utf-8',
    [AbstractResourceService.HEADER_AUTH]: () => 'Bearer ' + this.authService.getAccessToken()
  };

  abstract resourcePath: string;

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected messageService: MessageService
  ) { }

  protected handleError(error?: HttpErrorResponse) {
    let errorMessage;
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    if (error.error && error.error instanceof ErrorEvent) {
      console.log('A client-side or network error occurred');
      console.error(error);
      if (!errorMessage) {
        errorMessage = 'Wystąpił błąd';
      }
    } else {
      console.log('The backend returned an unsuccessful response code');
      console.error(error);
      if (!errorMessage) {
        errorMessage = 'Błąd serwera';
      }
    }
    this.messageService.error(errorMessage);
    return throwError(errorMessage);
  }

  protected getHeaders(...headers) {
    let httpHeaders = new HttpHeaders();
    for (let val of headers) {
      httpHeaders = httpHeaders.set(val, this.headersMap[val]());
    }
    return httpHeaders;
  }

  protected getPaginationParams(sort, page = '0') {
    return new HttpParams()
      .set('page', page)
      .set('sort', sort);
  }

  public getUrl(...params: string[]): string {
    const resUrl = environment.resourceServerUrl + this.resourcePath;
    return params ? resUrl + '/' + params.join('/') : resUrl;
  }

  protected performGet<T>(url: string, httpHeaders?: HttpHeaders, httpParams?: HttpParams): Observable<T> {
    return this.http.get<T>(
      url,
      {
        headers: httpHeaders,
        params: httpParams
      }
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  protected performPost<T>(url: string, body: any, httpHeaders?: HttpHeaders, httpParams?: HttpParams): Observable<T> {
    return this.http.post<T>(
      url,
      body,
      {
        headers: httpHeaders,
        params: httpParams
      }
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  protected performPut<T>(url: string, body: any, httpHeaders?: HttpHeaders, httpParams?: HttpParams): Observable<T> {
    return this.http.put<T>(
      url,
      body,
      {
        headers: httpHeaders,
        params: httpParams
      }
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  protected performDelete<T>(url: string, httpHeaders?: HttpHeaders, httpParams?: HttpParams): Observable<T> {
    return this.http.delete<T>(
      url,
      {
        headers: httpHeaders,
        params: httpParams
      }
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  protected getResourceById<T>(id: string | number, isProtected = false): Observable<T> {
    return this.performGet<T>(
      this.getUrl(id.toString()),
      isProtected ? this.getHeaders(AbstractResourceService.HEADER_AUTH) : null
    );
  }

  protected createResource<T>(resource: object): Observable<T> {
    return this.performPost<T>(
      this.getUrl(),
      resource,
      this.getHeaders(
        AbstractResourceService.HEADER_AUTH,
        AbstractResourceService.HEADER_CONTENT_TYPE_APP_JSON
      )
    );
  }

  protected updateResource<T>(id: number | string, resource: object): Observable<T> {
    return this.performPut<T>(
      this.getUrl(id.toString()),
      resource,
      this.getHeaders(
        AbstractResourceService.HEADER_AUTH,
        AbstractResourceService.HEADER_CONTENT_TYPE_APP_JSON
      )
    );
  }

  protected deleteResource(id: number | string): Observable<any> {
    return this.performDelete<any>(
      this.getUrl(id.toString()),
      this.getHeaders(AbstractResourceService.HEADER_AUTH)
    );
  }
}
