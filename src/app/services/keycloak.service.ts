import { Injectable } from '@angular/core';
import { AbstractAuthService } from './abstract-auth-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { keyCloakAuthConfig } from 'src/environments/keyCloakAuthConfig';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService extends AbstractAuthService {
  protected _userNamePath = ['sub'];
  protected _rolesPath = ['authorities'];

  constructor(
    protected oauthService: OAuthService
  ) {
    super();
    this.configure();
  }

  protected configure(): void {
    this.oauthService.configure(keyCloakAuthConfig);
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  logout(): void {
    this.oauthService.logOut(true);
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
        () => {
          if (this.isLoggedIn()) {
            resolve();
          } else {
            this.oauthService.initCodeFlow();
          }
        }
      );
    });
  }
}
