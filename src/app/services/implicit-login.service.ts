import { AbstractAuthService } from './abstract-auth-service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/environments/authConfig';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class ImplicitLoginService extends AbstractAuthService {
    protected _userNamePath = ['sub'];
    protected _rolesPath = ['authorities'];

    constructor(
        protected oauthService: OAuthService
    ) {
        super();
        this.configure();
    }

    protected configure(): void {
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

    protected _getRoles(): string[] | null {
        if (this.isLoggedIn()) {
            return super._getPayload()['authorities'];
        }
        return null;
    }

    public getCurrentUser(): User {
        return new User(
            this._getPayload()['sub'],
            this.getUserRoles()
        );
    }
}
