import { Injectable } from '@angular/core';
import { ImplicitLoginService } from './implicit-login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private auth: ImplicitLoginService){}

    verifyUser(): void {
        this.auth.verifyUser();
    }

    isUserVerified(): boolean {
        return this.auth.isUserVerified();
    }

    aquireAccessToken(): void {
        this.auth.aquireAccessToken();
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    logout(): void {
        this.auth.logout();
    }
}
