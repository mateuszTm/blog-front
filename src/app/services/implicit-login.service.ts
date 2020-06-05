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

    public isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    public logout(): void {
        this.oauthService.logOut();
    }

    public getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }

    public login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.oauthService.tryLogin()
                .then((success) => {
                    if (success) {
                        resolve();
                    } else {
                        this.oauthService.initImplicitFlow();
                    }
                }).catch(
                    error => reject(error)
                );
        });
    }
}
