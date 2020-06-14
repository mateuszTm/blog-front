import { Injectable } from '@angular/core';
import { ImplicitLoginService } from './implicit-login.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user';
import { Role } from './role';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private subject = new Subject<boolean>();

    constructor(
        private auth: ImplicitLoginService,
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

    private _getJwtPayload(): string[] | null {
        return this.auth.getPayload();
    }

    public getUserRoles(): Role[] | null {
        const payload = this._getJwtPayload();
        if (payload) {
            return payload['authorities'].map(
                (role: string) => {
                    return Role[role];
                });
        }
        return null;
    }

    public hasRole(roles: Role[]): boolean {
        const userRoles = this.getUserRoles();
        if (userRoles && roles.every(val => userRoles.includes(val))) {
          return true;
        }
        return false;
    }

    getCurrentUser(): User | null {
        const payload = this._getJwtPayload();
        return new User(
            payload['sub'],
            this.getUserRoles()
        );
    }
}
