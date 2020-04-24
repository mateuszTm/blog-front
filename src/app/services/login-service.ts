import { Injectable } from '@angular/core';

export interface TokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

@Injectable()
export abstract class LoginService {
    abstract verifyUser(): void;
    abstract isUserVerified(): boolean;
    abstract aquireAccessToken(): boolean;
    abstract isLoggedIn(): boolean;
    abstract logout(): void;
}
