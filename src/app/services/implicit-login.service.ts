import { AbstractAuthService } from './abstract-auth-service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/environments/authConfig';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class ImplicitLoginService implements AbstractAuthService {

    constructor(
        private oauthService: OAuthService
    ) {
        this.configure();
    }

    private configure(): void {
        this.oauthService.configure(authConfig);
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

    getPayload(): string[] | null {
        let token = this.getAccessToken();
        if (token) {
            return jwt_decode(this.getAccessToken());
        }
        return null;
    }
}
