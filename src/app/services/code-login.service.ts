import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AbstractAuthService, TokenResponse } from './abstract-auth-service';

@Injectable({
    providedIn: 'root'
})
export class CodeLoginService implements AbstractAuthService {

    private cookieName = 'access_token';
    private authUrl = 'http://localhost:8081/authserver/oauth/authorize';
    private tokenUrl = 'http://localhost:8081/authserver/oauth/token';
    private clientId = 'client-id';
    private clientSecret = 'client-secret';
    private redirectUriLogin = 'http://localhost:4200/login';
    private redirectUriDone = 'http://localhost:4200';

    constructor(
            private httpClient: HttpClient,
            private cookie: CookieService
        ) {}

    logout(): void {
        this.cookie.delete(this.cookieName);
    }

    verifyUser(){
        this._redirectToCodeAuthEndpoint();
    }

    isUserVerified(): boolean {
        return window.location.href.includes('code');
    }

    aquireAccessToken(): void{
        const code = this._retrieveAccessCode();
        if (code) {
            this._requestAccessToken(code)
                .subscribe({
                    next: (data: TokenResponse) => {
                        this._saveAccessToken(data);
                        window.location.href = this.redirectUriDone;
                    }
                });
        }
    }

    private _redirectToCodeAuthEndpoint() {
        window.location.href = this.authUrl + '?response_type=code&client_id=' + this.clientId + '&redirect_uri=' + this.redirectUriLogin;
    }

    private _retrieveAccessCode(): string {
        const codeIndex = window.location.href.indexOf('code');
        if (codeIndex != -1) {
            return window.location.href.substring(codeIndex + 5);
        }
        return null;
    }

    private _requestAccessToken(accessCode: string): Observable<TokenResponse> {
        return this.httpClient.post<TokenResponse>(
            this.tokenUrl,
            new HttpParams()
                .set('grant_type', 'authorization_code')
                .set('redirect_uri', this.redirectUriLogin)
                .set('code', accessCode)
                .toString(),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
                }
            }
        );
    }

    private _saveAccessToken(token: TokenResponse): void {
        this.cookie.set(this.cookieName, token.access_token, new Date().getTime() + (token.expires_in * 1000));
    }

    isLoggedIn(): boolean {
        return this.cookie.check(this.cookieName);
    }
}
