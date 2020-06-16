import { Injectable } from '@angular/core';
import { ImplicitLoginService } from './implicit-login.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { KeycloakService } from './keycloak.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private subject = new Subject<boolean>();

    constructor(
        private auth: KeycloakService,
        private messageService: MessageService,
        private router: Router
    ) { }

    public observeLoggedInStatus() {
        return this.subject.asObservable();
    }

    private updateLoggedInStatus(status: boolean) {
        this.subject.next(status);
    }

    public isLoggedIn(): boolean {
        const isLogged = this.auth.isLoggedIn();
        this.updateLoggedInStatus(isLogged);
        return isLogged;
    }

    public logout(): void {
        this.auth.logout();
        this.updateLoggedInStatus(false);
        this.messageService.success('Zostałeś wylogowany');
    }

    public getAccessToken(): string {
        return this.auth.getAccessToken();
    }

    public login(): void {
        this.auth.login()
            .then(() => {
                this.updateLoggedInStatus(true);
                this.router.navigate(['/']);
                this.messageService.success('Zostałeś zalogowany');
            }).catch((error) => {
                this.router.navigate(['/']);
                this.messageService.error(error);
            });
    }

    public hasRole(roles: Role[]): boolean {
        return this.auth.hasRole(roles);
    }

    public getCurrentUser(): User | null {
        return this.auth.getCurrentUser();
    }
}
