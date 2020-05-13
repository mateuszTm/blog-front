import { AbstractAuthService } from './abstract-auth-service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';

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

    getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }
}
