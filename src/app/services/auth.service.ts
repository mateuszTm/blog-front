import { Injectable } from '@angular/core';
import { ImplicitLoginService } from './implicit-login.service';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

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
        MessageService.success('You have logged in');
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    logout(): void {
        this.auth.logout();
        MessageService.success('You have been logged out');
    }

    getAccessToken(): string {
        return this.auth.getAccessToken();
    }
}
