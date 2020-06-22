import { AuthConfig } from 'angular-oauth2-oidc';

export const keyCloakAuthConfig: AuthConfig = {
    issuer: 'http://localhost:8081/auth/realms/Blog',
    redirectUri: 'http://localhost:4200/login',
    clientId: 'blog',
    responseType: 'code',
    scope: 'openid profile email',
    requireHttps: false,
    showDebugInformation: true,
    disableAtHashCheck: true
};
