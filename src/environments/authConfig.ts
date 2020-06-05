import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    oidc: false,
    loginUrl: 'http://localhost:8081/authserver/oauth/authorize',
    redirectUri: 'http://localhost:4200/login',
    clientId: 'client-id',
    scope: 'read write',
};
