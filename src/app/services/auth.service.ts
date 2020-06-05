import { Injectable } from '@angular/core';
import { ImplicitLoginService } from './implicit-login.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private auth: ImplicitLoginService,
        private messageService: MessageService,
        private router: Router
    ) { }

    public isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    public logout(): void {
        this.auth.logout();
        this.messageService.success('Zostałeś wylogowany');
    }

    public getAccessToken(): string {
        return this.auth.getAccessToken();
    }

    public login(): void {
        this.auth.login()
            .then(() => {
                this.router.navigate(['/']);
                this.messageService.success('Zostałeś zalogowany');
            }).catch((error) => {
                this.router.navigate(['/']);
                this.messageService.error(error);
            });
    }

}
