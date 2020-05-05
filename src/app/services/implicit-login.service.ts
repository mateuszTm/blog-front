import { AbstractAuthService } from './abstract-auth-service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class ImplicitLoginService implements AbstractAuthService {

    private authUrl = 'http://localhost:8081/authserver/oauth/authorize';
    private clientId = 'client-id';
    private redirectUriLogin = 'http://localhost:4200/login';

    constructor(
        private oauthService: OAuthService
    ) {
        this.oauthService.configure({
            loginUrl: this.authUrl,
            redirectUri: this.redirectUriLogin,
            clientId: this.clientId,
            scope: 'read write',
            oidc: false
        });
        this.oauthService.tryLogin();
    }

    verifyUser(): void {
        this.oauthService.initImplicitFlow();
    }

    isUserVerified(): boolean {
        return window.location.href.includes('access_token');
    }

    aquireAccessToken(): void {
        this.oauthService.tryLogin();
    }

    isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    logout(): void {
        this.oauthService.logOut();
        location.reload();
    }

    // TODO
    // getResource(resourceUrl) : Observable<any>{
    //     var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+this.oauthService.getAccessToken()});
    //     return this._http.get(resourceUrl, { headers: headers })
    //                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    //   }
       
}